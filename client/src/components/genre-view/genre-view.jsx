import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import React from 'react';
import './genre-view';

import { Link } from 'react-router-dom';


function GenreView(props) {
  const { movies, titleName } = props;

  if (!movies || !movies.length) return null;

  const movie = movies.find(movie => movie.title == titleName);
  console.log(movie.genre)
    return (
    
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>
                      {movie.genre.name}
                    </Card.Title>     
                    <Card.Text>
                      Genre info: {movie.genre.description}
                    </Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                      <Button variant='primary'>Go back</Button>
                    </Link>
                </Card.Body>
            </Card>   
        </Container>
    );
  }

export default connect(({movies}) => ({movies}))(GenreView)

