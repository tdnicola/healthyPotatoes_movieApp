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
const mainMovies = [{
  title: 'Harry Potter and the Deathly Hallows Part 2',
  genre: 'Adventure',
  director: 'David Yates',
  description: 'Harry, Ron, and Hermione search for Voldemort\'s remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.',
  image: 'https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX667_CR0,0,667,999_AL_.jpg',
},
{
  title: 'The Thing',
  genre: 'Horror',
  director: 'John Carpenter',
  description: 'A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.',
  image: 'https://m.media-amazon.com/images/M/MV5BNDcyZmFjY2YtN2I1OC00MzU3LWIzZGEtZDA5N2VlNDJjYWI3L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY1000_CR0,0,660,1000_AL_.jpg',
},
{
  title: 'Back to the Future',
  genre: 'Adventure',
  director: 'Robert Zemeckis',
  description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
  image: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,643,1000_AL_.jpg',
},
{
  title: 'Interstellar',
  genre: 'Sci-Fi',
  director: 'Christopher Nolan',
  description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
  image: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_SX675_AL_.jpg',
},
{
  title: 'Tommy Boy',
  genre: 'Comedy',
  director: 'Peter Segal',
  description: 'After his auto-parts tycoon father dies, the overweight, underachieving son teams up with a snide accountant to try and save the family business.',
  image: 'https://m.media-amazon.com/images/M/MV5BNTMwZGU3MGUtZWE0Ni00YzExLWIyY2MtMmNmMDlmYTdmNzFkXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_.jpg',
},
{
  title: 'The Big Lebowski',
  genre: 'Comedy',
  director: 'Joel Coen, Ethan Coen',
  description: 'Jeff "The Dude" Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and enlists his bowling buddies to help get it.',
  image: 'https://m.media-amazon.com/images/M/MV5BMTQ0NjUzMDMyOF5BMl5BanBnXkFtZTgwODA1OTU0MDE@._V1_SY1000_CR0,0,670,1000_AL_.jpg',
},
{
  title: '2001 a Space Odyssey',
  genre: 'Sci-Fi',
  director: 'Stanley Kubrick',
  description: 'After discovering a mysterious artifact buried beneath the lunar surface, mankind sets off on a quest to find its origins with help from intelligent supercomputer HAL 9000.',
  image: 'https://m.media-amazon.com/images/M/MV5BMmNlYzRiNDctZWNhMi00MzI4LThkZTctMTUzMmZkMmFmNThmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
},
{
  title: 'Annihilation',
  genre: 'Thriller',
  director: 'Alex Garland',
  description: 'A biologist signs up for a dangerous, secret expedition into a mysterious zone where the laws of nature don\'t apply.',
  image: 'https://m.media-amazon.com/images/M/MV5BMTk2Mjc2NzYxNl5BMl5BanBnXkFtZTgwMTA2OTA1NDM@._V1_SY1000_CR0,0,640,1000_AL_.jpg',
},
{
  title: 'Donnie Darko',
  genre: 'Fantasy',
  director: 'Richard Kelly',
  description: 'A troubled teenager is plagued by visions of a man in a large rabbit suit who manipulates him to commit a series of crimes, after he narrowly escapes a bizarre accident.',
  image: 'https://m.media-amazon.com/images/M/MV5BZjZlZDlkYTktMmU1My00ZDBiLWFlNjEtYTBhNjVhOTM4ZjJjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
},
{
  title: 'Shaun of the dead',
  genre: 'Comedy',
  director: 'Edgar Wright',
  description: 'A man\'s uneventful life is disrupted by the zombie apocalypse',
  image: 'https://m.media-amazon.com/images/M/MV5BMTg5Mjk2NDMtZTk0Ny00YTQ0LWIzYWEtMWI5MGQ0Mjg1OTNkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,669,1000_AL_.jpg',
},
];

// users of the app info
let users = [{
  id: '1',
  name: 'Tone Loc',
  username: 'thedopeness',
  email: 'toneloc@gmail.com',
  dob: '01/01/01',
  favorites: [
    'friday',
    ],
  },
  {
    id: '2',
    name: 'Charlie Kelly',
    username: 'ratking',
    email: 'paddyspub@gmail.com',
    dob: '01/01/01',
    favorites: [],
  },
];

// GET MOVIE RESPONSES
app.get('/', function (req, res) {
  res.send('Welcome to some healthy potatos?');
});

//Gets info on the list of all movies
app.get('/movies', function (req, res) {
  res.json(mainMovies);
});

//Gets info of a single movie by name
app.get('/movies/:title', (req, res) => {
  res.json(mainMovies.find((movie) =>
{ return movie.title === req.params.movie}))
});

// find a movies genre
app.get('/movies/:title/genre', (req, res) => {
  const findGenre = mainMovies.find((movie) => {
    return movie.title === req.params.title
   });
    if (findGenre) {
      res.status(201).send('The genre of ' + findGenre.title + ' is ' + findGenre.genre);
    } else {
      res.status(404).send('No title found');
    }
  });

// find director
app.get('/movies/:title/director', (req, res) => {
  const findDirector = mainMovies.find((movie) => {
    return movie.title === req.params.title
   });
    if (findDirector) {
      res.status(201).send('The director of ' + findDirector.title + ' is ' + findDirector.director);
    } else {
      res.status(404).send('No title found');
    }
  });

// USER INFORMATION
app.post('/users', function (req, res) {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing "name" request in body'
    res.status(400).send(message);
  } else {
    newUser.id =  uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// delete USER by ID
app.delete('/users/:username', function (req, res) {
  const user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    users.filter(function (obj) { return obj.username !== req.params.username });
    res.status(201).send('User ID ' + user.username + ' was deleted.');
  }
});

//update user by id
app.put('/users/:username/:email/:dob/:name', function (req, res) {
  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    user.email = req.params.email;
    user.dob = req.params.dob;
    user.name = req.params.name;
    res.status(201).send('User ' + user.username + ' updated user information to email: ' + user.email + ' dob: ' + user.dob + ' name: ' + user.name);
  } else {
    res.status(404).send('User ' + user.username + 'not found')
  }
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
