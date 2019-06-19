import React from 'react';
import axios from 'axios';

//importing moviecard info
import { MovieCard } from '../movie-card/movie-card';

export class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
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

render() {
  //if the state isn't initialized, this will throw on runtime
  //before the data is initially loaded
  const { movies } = this.state;

  //before the movies has been loaded
  // if (!movies) return <div className="main-view" />;
    debugger
  return (
    <div className="main-view">
    { movies.map(movie => (
      <div className="MovieCard" key={movie._id}>{movie.title}</div>
    ))}
    </div>
    );
  }
}
