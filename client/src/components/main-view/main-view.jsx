//imports
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import React from 'react';
import Row from 'react-bootstrap/Row';
//importing moviecard/movieview info
import DirectorView from '../director-view/Director-View';
import GenreView from '../genre-view/Genre-View';
import { LoginView } from '../login-view/Login-View';
import  ProfileView  from '../profile-view/Profile-View';
import { RegistrationView } from '../registration-view/Registration-View';
import { UpdateProfile } from '../update-profile/Update-Profile';

//redux
import { setMovies, setLoggedInUser } from '../../actions/actions';
import MoviesList from '../movies-list/Movies-List';
import MovieView from '../movie-view/Movie-View';
//css
import './Main-View.scss';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

   async componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      // await this.onLoggedIn();
      // await this.getMovies();
      // await this.getUser();
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUser(localStorage.getItem("user"), accessToken);
    }
  }

  /**
   * if correct information is sent to post from login-view
   * @function onLoggedIn
   * @param {object} authData - from login-view
   * @returns {state} 
   * @returns {localStorage}
   */
//storing user/toek in localstorage
  async onLoggedIn(authData) {
    this.setState({
      user: authData.user.username
    });
    this.props.setLoggedInUser(authData.user);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  /**
   * once logged in submits a get request to get movie list
   * @async
   * @function getMovies
   * @param {token} token 
   * @returns {props}
   */

  //getting the movies after the user is logged in
  async getMovies(token) {
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

  /**
   * 
   * @function getUser
   * @param {string} user 
   * @param {string} token 
   * @returns {props} - setUsers
   */

  //getting information on user
  async getUser(user, token) {
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
