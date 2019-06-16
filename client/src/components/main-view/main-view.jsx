import React from 'react';
import axios from 'axios';

//importing moviecard info
import { MovieCard } from '../movie-card/movie-card';

export class MainView extends React.Component {
  //one of the hooks available in React Component
  componentDidMount() {
    axios.get('https://healthypotatoes.herokuapp.com/movies')
    .then(response => {
      ///assign the result to a state
      this.setState({
        movies: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

render() {
  //if the state isn't initialized, this will throw on runtime
  //before the data is initially loaded
  if (!this.state.movies) return <div className="main-view" />;
  const { movies } = this.state;

  //before the movies has been loaded
  // if (!movies) return <div className="main-view" />;

  return (
    <div className="main-view">
    { movies.map(movie => (
      <MovieCard key={movie._id} movie={movie}/>
    ))}
    </div>
    );
  }
}
