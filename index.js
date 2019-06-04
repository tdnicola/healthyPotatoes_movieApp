const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  mongoose = require ('mongoose'),
  Models = require('./model.js');

const app = express();
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/potatoes', {useNewUrlParser: true});

// logging info-morgan and bodyParser
app.use(morgan('common'));
app.use(bodyParser.json());

//static public folders
app.use(express.static('public'));

// GET MOVIE RESPONSES
app.get('/', function (req, res) {
  res.send('Welcome to some healthy potatos?');
});

//Gets info on the list of all movies
app.get('/movies', (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error ' + err);
  });
});

//Gets info of a single movie by name
app.get('/movies/:title', (req, res) => {
  Movies.findOne({ title: req.params.title })
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error ' + err);
  });
});

// find a movies genre - not currently working
app.get('/movies/:title/genre', (req, res) => {
  Movies.findOne({ title: req.params.title })
  .then((movie) => {
    if (movie) {
    res.status(201).send( req.params.title + '\'s genre is ' + movie.genre.name);
  } else {
    res.status(400).send( req.params.title + ' not found');
  }
})
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error ' + err);
  });
});

// find director
app.get('/movies/:title/director', (req, res) => {
  const findDirector = Movies.find((movie) => {
    return movie.title === req.params.title
   });
    if (findDirector) {
      res.status(201).send('The director of ' + findDirector.title + ' is ' + findDirector.director);
    } else {
      res.status(404).send('No title found');
    }
  });

// director information *all users
app.get('/directors', (req, res) => {
  res.json(directorInfo);
});

//Find a directors information *single
app.get('/directors/:director', (req, res) => {
  res.json(directorInfo.find((director) => { return director.name === req.params.director}));
})

// USER INFORMATION

//create user
app.post('/users', (req, res) => {
  Users.findOne({ Username : req.body.Username })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + ' already exists');
    }
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      })
      .then((user) => { res.status(201).json(user); })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error ' + error );
      })

  }).catch((error) => {
    console.error(error);
    res.status(505).send('Error ' + error);
  });
});

//get all users
app.get('/users', (req, res) => {
  Users.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error ' + err);
  });
});

//get single user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error ' + err);
  });
});

// delete USER by ID
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then((user) => {
    if (!user) {
    res.status(400).send(req.params.Username + ' was not found');
  } else {
    res.status(200).send(req.params.Username + ' was deleted');
  }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error ' + err);
  });
});

//update user by id
app.put('/users/:username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
  {
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday,
  } },
  { new: true }, //This line makes sure the the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//add favorite movie
app.post('/users/:username/favoritemovies/:movieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { favoriteMovies: req.params.movieID }
  },
{ new: true}, //updated document is returned
(err, updatedUser) => {
  if (err) {
    console.log(err);
    res.status(500).send('Error ' + err)
  } else {
    res.json(updatedUser);
  }
});
});

//update favorite movies
app.put('/users/:username/favorites', function (req, res) {
  let userFavorites = req.body;

  if (!userFavorites) {
    const message = 'Missing username in request body';
    res.status(400).send(message);
  } else {
    const userFav = users.find((userFav) => { return userFav.username === req.params.username });
    userFav.favorites.push(userFavorites.favorites);
    res.status(201).send('updated favorites');
  }
});

//delete favorite movie
app.delete('/users/:username/favorites', function (req, res) {
  res.status(201).send('successful update of movies');
// still working on updating favorite movies
  // let deleteFavorites = req.body;
  //
  // if (!deleteFavorites) {
  //   const message = "Missing movie in required field";
  //   res.status(400).send(message);
  // } else {
  //   const userDel = users.find((userDel) => {return userDel.name = req.params.name});
  //   const deleteMovie = userDel.favorites.filter(obj => {return obj !== deleteFavorites.movie;});
  //   userDel.favorites = deleteMovie;
  //   res.status(201).send(deleteMovie);
  // }
});

//static public folders
app.use(express.static('public'));

//error handingling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('You broke something');
});

// listening for requests
app.listen(8080, () =>
console.log('Your app is listening on port 8080')
);
