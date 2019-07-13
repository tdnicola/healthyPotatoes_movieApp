//imports
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  addFavoriteMovie(e) {
    e.preventDefault();
    console.log();
    // send a request to the server for authentication
    axios.post(`https://healthypotatoes.herokuapp.com/users/${localStorage.getItem('user')}/favoriteMovies/${this.props.movie._id}`, {
      username: localStorage.getItem('user')
   }, {
       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      alert('added movie to favorites');
    })
    .catch(e => {
      alert('error updating movies');
    });
  }
  
  render() {
    const { movie, onClick } = this.props;
    if (!movie) return null;

    return (
      <div>
        <Container>
          <Row>
                <Card>
                  <Card.Img variant="top" src={movie.imagepath} />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Card.Text>Genre: {movie.genre.name}</Card.Text>
                      <Card.Text>Director: {movie.director.name}</Card.Text>
                      <Card.Text>Director Bio: {movie.director.bio}</Card.Text>
                      <Card.Text><a href={movie.trailer}>Watch Trailer</a></Card.Text>
                      <Link to={`/`}>
                        <Button variant='primary'>Go back</Button>
                      </Link>
                      <Button className='favoriteButton' variant='primary' onClick={e => this.addFavoriteMovie(e)}>Add to Favorites</Button>
                    </Card.Body>
                </Card>   
           </Row>
        </Container>
      </div>
    );
  }
}
