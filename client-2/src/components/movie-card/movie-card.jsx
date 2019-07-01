
import React from 'react';
//propTypes validate the data types based on the configuration
import PropTypes from 'prop-types';
//bootstrap info
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import './movie-card.scss';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (

          <Col xs={12} sm={6} md={4}>
            <Card>
              <Card.Img src={movie.imagepath} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button>More info</Button>
                </Link>
              </Card.Body>
            </Card>
         </Col>
 
    );  
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
};
