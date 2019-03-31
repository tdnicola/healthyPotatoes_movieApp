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

// app.get('/documentation', function (req, res) {
//   res.sendFile('public/documentation.html', { root: _dirname }
// );
// });

app.get('/movies', function (req, res) {
  res.json(movies);
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
