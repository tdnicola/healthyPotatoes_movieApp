import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import React from 'react';
import { Link } from 'react-router-dom';

import './director-view';

export class DirectorView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: null,
        password: null,
        email: null,
        birthday: null,
        favoriteMovies: [],
        movies: [],
        favorite: [],
        director: []
    };
  } 

  render() {
    const { director } = this.props;

    return (
      <Container>
                <Card>
                  <Card.Img variant="top"/>
                    <Card.Body>
                      <Card.Title>{console.log(this.props)}</Card.Title>
                      <Card.Text>
                        Director: {director.name}
                      </Card.Text>
                      <Card.Text>
                        Director Bio: {director.bio}
                        </Card.Text>
                      <Card.Text>
                        Birth: {director.birth}
                      </Card.Text>
                      <Card.Text>
                        Year of death or alive: {director.death}
                        {console.log(this)}
                      </Card.Text>
                      <Link to={`/`}>
                        <Button variant='primary'>Go back</Button>
                      </Link>                     
                    </Card.Body>
                </Card> 
      </Container>
    );
  }
}
