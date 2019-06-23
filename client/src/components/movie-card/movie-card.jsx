import React from 'react';
//propTypes validate the data types based on the configuration
import PropTypes from 'prop-types';
//bootstrap info
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.imagepath} height='100px' width='40px' />
        <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Button variant="primary" onClick={() => onClick(movie)} className="movie-card">
      More Info
        </Button>
      </Card.Body>
    </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
