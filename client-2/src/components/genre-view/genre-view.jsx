import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import React from 'react';
import './genre-view';

import { Link } from 'react-router-dom';

export class GenreView extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { genre } = this.props;

    return (
        <Container>
                <Card>
                    <Card.Body>
                      <Card.Title>{console.log(genre.name)}</Card.Title>
                      <Card.Text>
                        Genre: {genre.name}
                      </Card.Text>
                      <Card.Text>
                        Genre info: {genre.description}
                        {console.log(this)}
                      </Card.Text>
                      <Link to={`/movies/${this.props.movie._id}`}>
                        <Button variant='primary'>Go back</Button>
                      </Link>
                    </Card.Body>
                </Card>   
        </Container>
    );
  }
}
// {`/movies/${this.movie._id}`}>