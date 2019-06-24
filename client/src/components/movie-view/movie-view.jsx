import React from 'react';
//imports from react
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './movie-view.css';

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;
    if (!movie) return null;

    return (
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.imagepath} />
        <Card.Body>
          <Card.Title>Movie Title: {movie.title}</Card.Title>
          <Card.Text>Movie Genre: {movie.genre.name}</Card.Text>
          <Card.Text>Movie Director: {movie.director.name}</Card.Text>
          <Card.Text>Director Bio: {movie.director.bio}</Card.Text>


          <Button variant="primary" onClick={() => onClick()} className="homeButton">
            Go back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
