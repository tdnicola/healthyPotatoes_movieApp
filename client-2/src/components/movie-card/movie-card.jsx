
import React from 'react';
//propTypes validate the data types based on the configuration
import PropTypes from 'prop-types';
//bootstrap info
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <div>
            <Card>
              <Card.Img src={movie.imagepath} />
              <Card.Body>
                <Card.Title key={movie._id}>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button>More info</Button>
                </Link>
              </Card.Body>
            </Card>
      </div>
 
    );  
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
};
