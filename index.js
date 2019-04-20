const express = require('express');
  morgan = require('morgan');
const app = express();


// top movies

let movies = [{
  movie: 'Harry Potter',
  genre: 'Adventure',
},
{
  movie: 'The Thing',
  genre: 'Horror',
},
{
  movie: 'Back to the Future',
  genre: 'Adventure',
},
{
  movie: 'Interstellar',
  genre: 'Sci-Fi',
},
{
  movie: 'Tommy Boy',
  genre: 'Comedy',
},
{
  movie: 'The Big Lebowski',
  genre: 'Comedy',
},
{
  movie: '2001 a Space Odyssey',
  genre: 'Sci-Fi',
},
{
  movie: 'Annihilation',
  genre: 'Thriller',
},
{
  movie: 'Donnie Darko',
  genre: 'Fantasy',
},
{
  movie: 'Shaun of the dead',
  genre: 'Comedy',
},
];

// logging info-morgan
app.use(morgan('common'));

// GET responses
app.get('/', function (req, res) {
  res.send('Welcome to some healthy potatos?');
});

app.get('/movies', function (req, res) {
  res.json(movies);
});

app.get('/movies/:name/genre', function (req, res) {
  res.send('Successful Get request for movie genre');
});

app.get('/movies/:name/:director', function (req, res) {
  res.send('Successful Get request for movie director');
});

app.post('/users', function (req, res) {
  res.send('Successful post request for new user');
});

app.delete('/users/:username', function (req, res) {
  res.send('Successful post request for new user');
});

app.put('/users', function (req, res) {
  res.send('Successful put request to update user');
});

app.put('/users/:username/:movies', function (req, res) {
  res.send('Successful put request to update their movies');
});

app.delete('/users/:username/:movies', function (req, res) {
  res.send('Successful deletion of a movie');
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
