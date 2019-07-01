//imports
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import './movie-view.scss';
import { Link } from 'react-router-dom';
export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;
    if (!movie) return null;

    return (
      <div>
                <Card style={{ width: '75%' }}>
                  <Card.Img variant="top" src={movie.imagepath} />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Card.Text>Genre: {movie.genre.name}</Card.Text>
                      <Card.Text>Director: {movie.director.name}</Card.Text>
                      <Card.Text>Director Bio: {movie.director.bio}</Card.Text>
                      <Card.Text><a href={movie.trailer}>Watch Trailer</a></Card.Text>
                      <Link to={`/movies`}>
                        <Button variant='primary'> Go back</Button>
                      </Link>
                    </Card.Body>
                  </Card>   
    </div>
    );
  }
}
