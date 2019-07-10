import React from 'react';
import './profile-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'


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
      const accessToken = localStorage.getItem('token');
      this.getUser(accessToken);
    }

    getUser(token) {
        const username = this.props.username;
        axios.get(`https://healthypotatoes.herokuapp.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` } 
        })
        .then(res => {
          console.log(res.data)
          this.setState({
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

      deleteUser(e) {
      
        axios.delete(`https://healthypotatoes.herokuapp.com/users/${localStorage.getItem('user')}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
          alert('Account deleted');

          localStorage.removeItem('token', 'user');
          window.open('/');
        })
        .catch(event => {
          alert('failed to delete user');
        });
      }

      // const handleSubmit = (e) => {
      //   e.preventDefault();
      //   // send a request to the server for authentication
      //   axios.put(`https://healthypotatoes.herokuapp.com/users/${localStorage.getItem('user')}`, {
      //     username: this.state.username, 
      //     password: this.state.password, 
      //     birthday: this.state.birthday, 
      //     email: this.state.email,
      //  },{
      //      headers: {Authorization: `Bearer${localStorage.getItem('token')}`}
      //   })
      //   .then(res => {
      //     const data = res.data;
      //     console.log(data);
      //     alert('changed info');
      //     window.open('/');
      //   })
      //   .catch(e => {
      //     alert('error updating user');
      //   });
      // };

    render() {
        return (
            <div>
              <Container>
                <Col>
                  <Card>
                      <Card.Body>
                      <Card.Title>{this.state.username}</Card.Title>
                      <Card.Text>email: {this.state.email}</Card.Text>
                      <Card.Text>birthday {this.state.birthday}</Card.Text>
                      <Card.Text>favorite movies: {this.state.favoriteMovies}</Card.Text>

                      <Link to={`/`}>
                          <Button variant='primary'> Go back</Button>
                      </Link>
                      <Link to={'/user/update'}>
                          <Button variant='primary'> Update ALL your profile.</Button>
                      </Link>
                      <Button onClick={() => this.deleteUser()}>Delete account</Button>
                      </Card.Body>
                  </Card>   
                  
                </Col>
              </Container>
            </div>
        );
    }
}