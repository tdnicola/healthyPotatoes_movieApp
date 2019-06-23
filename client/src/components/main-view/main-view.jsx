import React from 'react';
import axios from 'axios';

//importing moviecard/movieview info
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView} from '../registration-view/registration-view'

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
  }

//clicking movie to get more info
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

//button to return back
  onButtonClick() {
    this.setState({
    selectedMovie: null
  });
  }

  register() {
    this.setState({
      register: true
    });
  }

render() {
  //if the state isn't initialized, this will throw on runtime
  //before the data is initially loaded
  const { movies, selectedMovie, user } = this.state;

  if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

  // if (register) return <RegistrationView onClick={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} />

//before the movies has been loaded
  if (!movies) return <div className="main-view" />;
  return (
    <div className="main-view">
      {selectedMovie
      ? <MovieView movie={selectedMovie} onClick={movie => this.onButtonClick()} />
    : movies.map(movie => (
      <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
    ))
  }
    </div>
    );
  }
}
