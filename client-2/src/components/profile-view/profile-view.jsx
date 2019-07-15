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
            movies: [],
            favorite: []
        };
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
          this.setState({
            username: res.data.username,
            password: res.data.password,
            email: res.data.email,
            birthday: res.data.birthday,
            favoriteMovies: res.data.favoriteMovies,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      }
      
   deleteFavoriteMovie(movieId) {
      console.log(this.props.movies)
        // send a request to the server for authentication
        axios.delete(`https://healthypotatoes.herokuapp.com/users/${localStorage.getItem('user')}/favoriteMovies/${movieId}`, {
           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => {
          alert('removed movie from favorites');
        })
        .catch(e => {
          alert('error removing movie' + e);
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

    render() {
      const favoriteMovieList = this.props.movies.filter(m => this.state.favoriteMovies.includes(m._id));
    
      return (
        <div>
              <Container>
                <Col>
                  <Card>
                      <Card.Body>
                      <Card.Title>{this.state.username}</Card.Title>
                      <Card.Text>email: {this.state.email}</Card.Text>
                      <Card.Text>birthday {this.state.birthday}</Card.Text>
                      <Card.Text>{ favoriteMovieList.map(m => (
                        <div className='fav-movies-button'>
                        <Link key={m._id} to={`/movies/${m._id}`}>
                        <div className='fav-movies-link'><Button variant="link">{m.title}</Button></div>
                        </Link>
                        <Button onClick={e => this.deleteFavoriteMovie(m._id)}>{console.log(m._id)}Remove</Button>
                        </div>
                      ))
                      }
                      </Card.Text>

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
