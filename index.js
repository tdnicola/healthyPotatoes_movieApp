const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

// logging info-morgan and bodyParser
app.use(morgan('common'));
app.use(bodyParser.json());

//static public folders
app.use(express.static('public'));

// top movies
let Movies = [{
  movie: 'Harry Potter and the Deathly Hallows Part 2',
  genre: 'Adventure',
  director: 'David Yates',
  description: 'Harry, Ron, and Hermione search for Voldemort\'s remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.',
  image: 'https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX667_CR0,0,667,999_AL_.jpg',
},
{
  movie: 'The Thing',
  genre: 'Horror',
  director: 'John Carpenter',
  description: 'A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.',
  image: 'https://m.media-amazon.com/images/M/MV5BNDcyZmFjY2YtN2I1OC00MzU3LWIzZGEtZDA5N2VlNDJjYWI3L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_CR0,0,660,1000_AL_.jpg',
},
{
  movie: 'Back to the Future',
  genre: 'Adventure',
  director: 'Robert Zemeckis',
  description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
  image: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,643,1000_AL_.jpg',
},
{
  movie: 'Interstellar',
  genre: 'Sci-Fi',
  director: 'Christopher Nolan',
  description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
  image: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_SX675_AL_.jpg',
},
{
  movie: 'Tommy Boy',
  genre: 'Comedy',
  director: 'Peter Segal',
  description: 'After his auto-parts tycoon father dies, the overweight, underachieving son teams up with a snide accountant to try and save the family business.',
  image: 'https://m.media-amazon.com/images/M/MV5BNTMwZGU3MGUtZWE0Ni00YzExLWIyY2MtMmNmMDlmYTdmNzFkXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_.jpg',
},
{
  movie: 'The Big Lebowski',
  genre: 'Comedy',
  director: 'Joel Coen, Ethan Coen',
  description: 'Jeff "The Dude" Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and enlists his bowling buddies to help get it.',
  image: 'https://m.media-amazon.com/images/M/MV5BMTQ0NjUzMDMyOF5BMl5BanBnXkFtZTgwODA1OTU0MDE@._V1_SY1000_CR0,0,670,1000_AL_.jpg',
},
{
  movie: '2001 a Space Odyssey',
  genre: 'Sci-Fi',
  director: 'Stanley Kubrick',
  description: 'After discovering a mysterious artifact buried beneath the lunar surface, mankind sets off on a quest to find its origins with help from intelligent supercomputer HAL 9000.',
  image: 'https://m.media-amazon.com/images/M/MV5BMmNlYzRiNDctZWNhMi00MzI4LThkZTctMTUzMmZkMmFmNThmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
},
{
  movie: 'Annihilation',
  genre: 'Thriller',
  director: 'Alex Garland',
  description: 'A biologist signs up for a dangerous, secret expedition into a mysterious zone where the laws of nature don\'t apply.',
  image: 'https://m.media-amazon.com/images/M/MV5BMTk2Mjc2NzYxNl5BMl5BanBnXkFtZTgwMTA2OTA1NDM@._V1_SY1000_CR0,0,640,1000_AL_.jpg',
},
{
  movie: 'Donnie Darko',
  genre: 'Fantasy',
  director: 'Richard Kelly',
  description: 'A troubled teenager is plagued by visions of a man in a large rabbit suit who manipulates him to commit a series of crimes, after he narrowly escapes a bizarre accident.',
  image: 'https://m.media-amazon.com/images/M/MV5BZjZlZDlkYTktMmU1My00ZDBiLWFlNjEtYTBhNjVhOTM4ZjJjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
},
{
  movie: 'Shaun of the dead',
  genre: 'Comedy',
  director: 'Edgar Wright',
  description: 'A man\'s uneventful life is disrupted by the zombie apocalypse',
  image: 'https://m.media-amazon.com/images/M/MV5BMTg5Mjk2NDMtZTk0Ny00YTQ0LWIzYWEtMWI5MGQ0Mjg1OTNkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,669,1000_AL_.jpg',
},
];

// users of the app info
let users = [{
  id: '',
  name: '',
  email: '',
  dob: '',
  favorites: [
    'test',
  ],
}];

// GET responses
app.get('/', function (req, res) {
  res.send('Welcome to some healthy potatos?');
});

//Gets info on the list of all movies
app.get('/movies', function (req, res) {
  res.json(Movies);
});

//Gets info of a single movie by name, ** currently not working correctly
app.get('/movies/:name', (req, res) => {
  res.json(Movies.find((movie) =>
{ return movie.name === req.params.name}))
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
