//imports
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import React from 'react';
import Row from 'react-bootstrap/Row';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//importing moviecard/movieview info
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';
import { UpdateProfile } from '../update-profile/update-profile';
import './main-view.scss';

export class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selectedMovieId: null,
      user: null,
      register: false,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

//clicking movie to get more info
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });

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
      this.setState({
        movies: res.data
      });
      localStorage.setItem('movies', JSON.stringify(this.state.movies));
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

//button to return back
  onButtonClick() {
    this.setState({
    selectedMovie: null
  });
  }

  //button to logout and clear token/username
  buttonLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({
      user: false,
      selctedMovie: null,
    })
    // window.location.reload();
  }

  onSignedIn(user) {
    this.setState({
      user: user,
      register: false,
    });
  }
  
  register() {
    this.setState({
      register: true
    });
  }

  alreadyMember() {
    this.setState({
      register: false
    })
  }

//RENDER//
//RENDER//
render() {
  //if the state isn't initialized, this will throw on runtime
  //before the data is initially loaded
  const { movies, selectedMovie, user, register } = this.state;

//before the movies has been loaded
  if (!movies) return <div className="main-view" />;

  return (
    <Router>
      <div className="main-view">

            <Route exact path='/' render={() => {
              if (!user) return (
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />);
        
                return (
                  <div>
                    <div className='userInfo'>
                      <Button className='logoutButton' onClick={() => this.buttonLogout()}>Log Out</Button>
                      <Link to={`/user`}> 
                          <Button>Profile</Button>
                      </Link>
                    </div>
                    <Container>
                        <Row>
                          {movies.map(m => ( 
                            <Col key={m._id} xs={12} sm={6} md={4} lg={4}>
                            <MovieCard movie={m} />
                            </Col>
                          ))}
                        </Row>
                  </Container>
                  </div>
                ); 
            }} 
            /> 
            
            <Route path='/directors/:name' render={({ match }) => {
              if (!movies || !movies.length) return <div className="main-view" />;
              return <DirectorView director={movies.find(m => m.director.name === match.params.name).director} movies={movies}/>; 
            }}
            />

            <Route path='/genres/:title/:name' render={({ match }) => {
              if (!movies || !movies.length) return <div className="main-view" />;
              return <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} movie={movies.find(m => m.title === match.params.title)} />; 
            }}
            />
            
            <Route path='/user' render={() => <ProfileView username={this.state.user} movies={movies} />} />

            <Route path='/register' render={() => <RegistrationView />} />

            <Route path='/user/update' render={() => <UpdateProfile />} />

            <Route path='/movies/:movieId' render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

      </div>
    </Router>
    );
  }
}
