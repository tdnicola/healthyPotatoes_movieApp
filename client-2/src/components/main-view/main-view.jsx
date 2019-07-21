//imports
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import React from 'react';
import Row from 'react-bootstrap/Row';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//importing moviecard/movieview info
import { connect } from 'react-redux';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import  ProfileView  from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';
import { UpdateProfile } from '../update-profile/update-profile';


import { setMovies, setLoggedInUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';

import './main-view.scss';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUser(localStorage.getItem("user"), accessToken);
    }
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.username
    });
    this.props.setLoggedInUser(authData.user);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  //getting the movies after the user is logged in
  getMovies(token) {
    axios.get('https://healthypotatoes.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(res => {
      this.props.setMovies(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }


  getUser(user, token) {
    let username = localStorage.getItem('user');
    axios.get(`https://healthypotatoes.herokuapp.com/user/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
    this.props.setUsers(response.data);
    console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }

  // onSignedIn(user) {
  //   this.setState({
  //     user: user,
  //   });
  // }

//RENDER//
//RENDER//
  render() {

    const { movies, user, } = this.state;

    return (
      <Router>
        <div className="main-view">

          <Container>
            <Row>
            
                <Route exact path='/' render={() => {
                  if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                  return <MoviesList />
                }} 
                />
                
                <Route path='/movies/:id' render={({match}) => <MovieView movieId={match.params.id} />} />

                <Route exact path="/genres/:title/:name" render={({ match }) => <GenreView titleName={match.params.title} />} />

                <Route exact path="/directors/:name" render={({ match }) => <DirectorView directorName={match.params.name} />} />

                <Route exact path="/register" render={() => <RegistrationView />} />

                <Route exact path="/user" render={() => <ProfileView movies={movies} />} />

                <Route path='/user/update' render={() => <UpdateProfile />} />

            </Row>
          </Container>
         </div>
      </Router>
    );
  }
}

export default connect(null, { setMovies, setLoggedInUser } ) (MainView); 
