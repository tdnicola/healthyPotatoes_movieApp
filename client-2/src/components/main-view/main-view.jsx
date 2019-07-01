//imports
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React from 'react';
import Row from 'react-bootstrap/Row';

//importing moviecard/movieview info
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import './main-view.scss';

export class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false
    };
  }

  //one of the hooks available in React Component

  componentDidMount() {
    axios.get('https://healthypotatoes.herokuapp.com/movies')
    .then(res => {
      console.log(res);
      ///assign the result to a state
      this.setState({
        movies: res.data
      });
    })
    .catch((error) => {
      console.log(error);
    });

    window.addEventListener('hashchange', this.handleNewHash, false);

    this.handleNewHash();
  }

  handleNewHash = () => {
    const movieId = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');

    this.setState({
      selectedMovieId: movieId[0]
    });
  }

//clicking movie to get more info
  onMovieClick(movie) {
    window.location.hash = '#' + movie._id;
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

  getMovies(token) {
    axios.get('https://healthypotatoes.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(res => {
      this.setState({
        movies: res.data
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
  // older loggedin method without auth
  // onLoggedIn(user) {
  //   this.setState({
  //     user
  //   });
  // }

//button to return back
  onButtonClick() {
    this.setState({
    selectedMovie: null
  });
  }

  //testing
  onSignedIn(user) {
    this.setState({
      user: user,
      register: false,
    });
  }
  //testing
  register() {
    this.setState({
      register: true
    });
  }

  //testing
  alreadyMember() {
    this.setState({
      register: false
    })
  }

  render() {
    const { movies, selectedMovieId, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies || !movies.length) return <div className="main-view"/>;
  const selectedMovie = selectedMovieId ? movies.find(m => m._id === selectedMovieId) : null;

    return (
     <div className="main-view">
        <Container>
           <Row>
        
              {selectedMovie
              ? <MovieView movie={selectedMovie}/>
              : movies.map(movie => (
                <Col key={movie._id} xs={12} sm={6} md={4}>
                <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
                </Col>
              ))
            }
            </Row>
      </Container>
     </div>
    );
  }
}

// render() {
//   //if the state isn't initialized, this will throw on runtime
//   //before the data is initially loaded
//   const { movies, selectedMovie, user, register } = this.state;

//   if (!user && register === false) return <LoginView onClick={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} />

//   if (register) return <RegistrationView onClick={() => this.alreadyMember()} onSignedIn={user => this.onSignedIn(user)} />
//   // if (!user && register === false) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

//   // if (register) return <RegistrationView onClick={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} />

// //before the movies has been loaded
//   if (!movies) return <div className="main-view" />;
//   return (
//     <div className="main-view">
//       <Container>
//         <Row>
//           {selectedMovie
//           ? <MovieView movie={selectedMovie} onClick={() => this.onButtonClick()}/>
//           : movies.map(movie => (
            
//             <Col key={movie._id} xs={12} sm={6} md={4}>
//             <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
//             </Col>
//            ))
//           }
//         </Row>
//       </Container>
//     </div>
//     );
//   }
// }
