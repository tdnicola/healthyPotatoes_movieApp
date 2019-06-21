import React from 'react';
//imports from react
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
      <Card.Img variant="top" src={movie.imagepath} height='100px' width='40px' />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.genre.name}</Card.Text>
        <Card.Text>{movie.director.name}</Card.Text>

        <Button variant="primary" onClick={() => onClick()} className="homeButton">
          Go back
        </Button>
      </Card.Body>
    </Card>
  );
      //old method for displaying information
      // <div className="movie-view">
      //  <div className="movie-title">
      //     <div className="label">Title</div>
      //     <div className="value">{movie.title}</div>
      //   </div>
      //   <div className="movie-description">
      //     <div className="label">Description</div>
      //     <div className="value">{movie.description}</div>
      //   </div>
      //   <div className="movie-genre">
      //     <div className="label">Genre</div>
      //     <div className="value">{movie.genre.name}</div>
      //   </div>
      //   <div className="movie-director">
      //     <div className="label">Director</div>
      //     <div className="value">{movie.director.name}</div>
      //   </div>
      //   <div className="button">
      //   <button onClick={() => onClick()} className="homeButton">Go back</button>
      //   </div>
      // </div>
    // );
  }
}
