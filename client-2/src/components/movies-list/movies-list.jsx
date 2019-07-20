import React from 'react';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input'
import { MovieCard } from '../movie-card/movie-card';
import Container from 'react-bootstrap/Container';

const mapStateToProps = state => {
    const { movies, visibilityFilter, sortColumn } = state;

    let moviesToShow = movies.concat().sort((a,b) => {
        if (a[sortColumn] < b[sortColumn]) return -1;
        if (a[sortColumn] > b[sortColumn]) return 1;
        return 0;
    });

    if (visibilityFilter !== '') {
        moviesToShow = moviesToShow.filter(m => m.title.includes(visibilityFilter));
    }
    return { movies: moviesToShow };
};

function MoviesList(props){
    const { movies } = props;

    if (!movies) return <div className='main-view' />

    return <div classname='movies-list'>
        <VisibilityFilterInput />
        <Container>
            <Row>
        {movies.map(m => (
        <Col key={m._id} xs={12} sm={6} md={4} lg={4}>
            <MovieCard key={m._id} movie={m} />
        </Col>
        )
        )}
                </Row>
        </Container>
    </div>;
}

export default connect(mapStateToProps)(MoviesList);