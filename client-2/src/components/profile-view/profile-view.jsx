import React from 'react';
import './profile-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export class ProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: [],
        }
    }

    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      this.getUser(accessToken);
    }

    getUser(token) {
        let username = this.props.username;
        axios.get(`https://healthypotatoes.herokuapp.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(res => {
            console.log(res.data, 'testing')
          this.setState({
            userdata: res.data,
            username: res.data.username,
            password: res.data.password,
            email: res.data.email,
            birthday: res.data.birthday,
            favoriteMovies: res.data.favoriteMovies
          });
        })
        .catch((err) => {
          console.log(err);
        });
      }


    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                    <Card.Title>{this.state.username}</Card.Title>
                    <Card.Text>email: {this.state.email}</Card.Text>
                    <Card.Text>birthday {this.state.birthday}</Card.Text>
                    <Card.Text>favorite movies: {this.state.favoriteMovies}</Card.Text>

                    <Link to={`/movies`}>
                        <Button variant='primary'> Go back</Button>
                    </Link>
                    </Card.Body>
                </Card>   
            </div>
        );
    }
}