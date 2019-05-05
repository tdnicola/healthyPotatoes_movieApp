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

const directorInfo = [{
  name: 'Edgar Wright',
  birthyear: '4/18/1974',
  deathyear: 'alive',
  bio: 'is an English director, screenwriter and producer. He began making independent short films before making his first feature film A Fistful of Fingers (1995). Wright created and directed the comedy series Asylum in 1996, written with David Walliams. After directing several other television shows, Wright directed the sitcom Spaced (1999–2001), which aired for two series and starred frequent collaborators Simon Pegg and Nick Frost. In 2004, Wright directed the first film in the Three Flavours Cornetto, a romantic comedy with zombies Shaun of the Dead, starring Pegg and Frost. The film was co-written with Pegg—as were the next two entries in the trilogy, Hot Fuzz (2007) and The World\'s End (2013), which Wright directed and also starred the pair. In 2010, Wright co-wrote, produced, and directed the comedy action film Scott Pilgrim vs. the World. Along with Joe Cornish and Steven Moffat, he co-wrote Steven Spielberg\'s The Adventures of Tintin (2011). Wright and Cornish co-wrote the screenplay for the Marvel Cinematic Universe film Ant-Man in 2015, which Wright intended to direct but abandoned, citing creative differences. His latest film, the action film Baby Driver, was released in 2017.',
},
{
  name: 'Richard Kelly',
  birthyear: '3/28/1975',
  deathyear: 'alive',
  bio: 'James Richard Kelly better known as Richard Kelly, is an American film director and writer, known for writing and directing the cult classic Donnie Darko in 2001. Kelly was born James Richard Kelly in Newport News, Virginia, the son of Lane and Ennis Kelly. He grew up in Midlothian, Virginia, where he attended Midlothian High School and graduated in 1993. When he was a child, his father worked for NASA on the Mars Viking Lander program. He won a scholarship to the University of Southern California to study at the USC School of Cinema-Television where he was a member of the Phi Delta Theta fraternity. He made two short films at USC, The Goodbye Place and Visceral Matter, before graduating in 1997.',
},
{
  name: 'Alex Garland',
  birthyear: '5/26/1970',
  deathyear: 'alive',
  bio: ' Alex Garland is an English novelist, screenwriter, film producer and director. He is best known for the films Ex Machina (2015) and Annihilation (2018). Garland\'s others works as a writer includes The Beach (2000), 28 Days Later (2002), Sunshine (2007), Never Let Me Go (2011) and Dredd (2012). He is also the co-writer on the video game Enslaved: Odyssey to the West. In 2015, Garland made his directorial debut with Ex Machina and was nominated for an Oscar in the Best Writing, Original Screenplay category.',
},
{
  name: 'Stanley Kubrick',
  birthyear: '7/26.1928',
  deathyear: '3/7/1999',
  bio: 'was an American film director, screenwriter, and producer. He is frequently cited as one of the greatest and most influential filmmakers in cinematic history. His films, which are mostly adaptations of novels or short stories, cover a wide range of genres, and are noted for their realism, dark humor, unique cinematography, extensive set designs, and evocative use of music. Kubrick was raised in the Bronx, New York City, and attended William Howard Taft High School from 1941 to 1945. He only received average grades, but displayed a keen interest in literature, photography, and film from a young age, and taught himself all aspects of film production and directing after graduating from high school. After working as a photographer for Look magazine in the late 1940s and early 1950s, he began making short films on a shoestring budget, and made his first major Hollywood film, The Killing, for United Artists in 1956. This was followed by two collaborations with Kirk Douglas, the war picture Paths of Glory (1957) and the historical epic Spartacus (1960). His reputation as a filmmaker in Hollywood grew, and he was approached by Marlon Brando to film what would become One-Eyed Jacks (1961), though Brando eventually decided to direct it himself. Creative differences arising from his work with Douglas and the film studios, a dislike of the Hollywood industry, and a growing concern about crime in America prompted Kubrick to move to the United Kingdom in 1961, where he spent most of the remainder of his life and career. His home at Childwickbury Manor in Hertfordshire, which he shared with his wife Christiane, became his workplace, where he did his writing, research, editing, and management of production details. This allowed him to have almost complete artistic control over his films, but with the rare advantage of having financial support from major Hollywood studios. His first British productions were two films with Peter Sellers, Lolita (1962) and Dr. Strangelove (1964). A demanding perfectionist, Kubrick assumed control over most aspects of the filmmaking process, from direction and writing to editing, and took painstaking care with researching his films and staging scenes, working in close coordination with his actors and other collaborators. He often asked for several dozen retakes of the same scene in a movie, which resulted in many conflicts with his casts. Despite the resulting notoriety among actors, many of Kubrick\'s films broke new ground in cinematography. The scientific realism and innovative special effects of 2001: A Space Odyssey (1968) were without precedent in the history of cinema, and the film earned him his only personal Oscar, for Best Visual Effects. Steven Spielberg has referred to the film as his generation\'s "big bang", and it is regarded as one of the greatest films ever made. For the 18th-century period film Barry Lyndon (1975), Kubrick obtained lenses developed by Zeiss for NASA, to film scenes under natural candlelight. With The Shining (1980), he became one of the first directors to make use of a Steadicam for stabilized and fluid tracking shots. While many of Kubrick\'s films were controversial and initially received mixed reviews upon release—particularly A Clockwork Orange (1971), which Kubrick pulled from circulation in the UK following a mass media frenzy—most were nominated for Oscars, Golden Globes, or BAFTA Awards, and underwent critical reevaluations. His last film, Eyes Wide Shut, was completed shortly before his death in 1999 at the age of 70. ',
},
{
  name: 'Joel Coen',
  birthyear: '11/29/1954',
  deathyear: 'alive',
  bio: 'Joel Coen was born on November 29, 1954 in Minneapolis, Minnesota, USA as Joel Daniel Coen. He is a producer and writer, known for The Ballad of Buster Scruggs (2018), A Serious Man (2009) and Fargo (1996). He has been married to Frances McDormand since April 1, 1984. They have one child.',
},
{
  name: 'Ethan Coen',
  birthyear: '11/21/1957',
  deathyear: 'alive',
  bio: 'Ethan Coen was born on September 21, 1957 in Minneapolis, Minnesota, USA as Ethan Jesse Coen. He is a producer and writer, known for The Ballad of Buster Scruggs (2018), A Serious Man (2009) and Inside Llewyn Davis (2013). He has been married to Tricia Cooke since October 2, 1990. They have two children.',
},
{
  name: 'Christopher Nolan',
  birthyear: '7/30/1970',
  deathyear: 'alive',
  bio: 'Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970 in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made. At 7 years old, Nolan began making short movies with his father\'s Super-8 camera. While studying English Literature at University College London, he shot 16-millimetre films at U.C.L.\'s film society, where he learned the guerrilla techniques he would later use to make his first feature, Following (1998), on a budget of around $6,000. The noir thriller was recognized at a number of international film festivals prior to its theatrical release, and gained Nolan enough credibility that he was able to gather substantial financing for his next film. Nolan\'s second film was Memento (2000), which he directed from his own screenplay based on a short story by his brother Jonathan. Starring Guy Pearce, the film brought Nolan numerous honors, including Academy Award and Golden Globe Award nominations for Best Original Screenplay. Nolan went on to direct the critically acclaimed psychological thriller, Insomnia (2002), starring Al Pacino, Robin Williams and Hilary Swank. The turning point in Nolan\'s career occurred when he was awarded the chance to revive the Batman franchise in 2005. In Batman Begins (2005), Nolan brought a level of gravitas back to the iconic hero, and his gritty, modern interpretation was greeted with praise from fans and critics alike. Before moving on to a Batman sequel, Nolan directed, co-wrote, and produced the mystery thriller The Prestige (2006), starring Christian Bale and Hugh Jackman as magicians whose obsessive rivalry leads to tragedy and murder. In 2008, Nolan directed, co-wrote, and produced The Dark Knight (2008) which went on to gross more than a billion dollars at the worldwide box office. Nolan was nominated for a Directors Guild of America (D.G.A.) Award, Writers Guild of America (W.G.A.) Award and Producers Guild of America (P.G.A.) Award, and the film also received eight Academy Award nominations. In 2010, Nolan captivated audiences with the sci-fi thriller Inception (2010), which he directed and produced from his own original screenplay. The thought-provoking drama was a worldwide blockbuster, earning more than $800,000,000 dollars and becoming one of the most discussed and debated films of the year. Among its many honors, Inception received four Academy Awards and eight nominations, including Best Picture and Best Screenplay. Nolan was recognized by his peers with D.G.A. and P.G.A. Award nominations, as well as a W.G.A. Award for his work on the film. One of the best-reviewed and highest-grossing movies of 2012, The Dark Knight Rises (2012) concluded Nolan\'s Batman trilogy. Due to his success rebooting the Batman character, Warner Bros. enlisted Nolan to produce their revamped Superman movie Man of Steel (2013), which opened in the summer of 2013. In 2014, Nolan directed, wrote, and produced the science fiction epic Interstellar (2014), starring Matthew McConaughey, Anne Hathaway and Jessica Chastain. Paramount Pictures and Warner Bros. released the film on November 5, 2014 to positive reviews and strong box-office results, grossing over $670 million dollars worldwide. Nolan resides in Los Angeles, California with his wife, producer Emma Thomas, and their children. Nolan and Thomas also have their own production company, Syncopy.',
},
{
  name: 'Robert Zemeckis',
  birthyear: '5/14/1951',
  deathyear: 'alive',
  bio: 'A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert\'s earlier films show he has a talent for zany comedy (Romancing the Stone (1984), 1941 (1979)) and special effect vehicles (Who Framed Roger Rabbit (1988) and Back to the Future (1985)). His later films have become more serious, with the hugely successful Tom Hanks vehicle Forrest Gump (1994) and the Jodie Foster film Contact (1997), both critically acclaimed movies. Again, these films incorporate stunning effects. Robert has proved he can work a serious story around great effects.',
},
{
  name: 'John Carpenter',
  birthyear: '01/16/1948',
  deathyear: 'alive',
  bio: 'John Howard Carpenter was born in Carthage, New York, to mother Milton Jean (Carter) and father Howard Ralph Carpenter. His family moved to Bowling Green, Kentucky, where his father, a professor, was head of the music department at Western Kentucky University. He attended Western Kentucky University and then USC film school in Los Angeles. He began making short films in 1962, and won an Academy Award for Best Live-Action Short Subject in 1970, for The Resurrection of Broncho Billy (1970), which he made while at USC. Carpenter formed a band in the mid-1970s called The Coupe de Villes, which included future directors Tommy Lee Wallace and Nick Castle. Since the 1970s, he has had numerous roles in the film industry including writer, actor, composer, producer, and director. After directing Dark Star (1974), he has helmed both classic horror films like Halloween (1978), The Fog (1980), and The Thing (1982), and noted sci-fi tales like Escape from New York (1981) and Starman (1984).',
},
{
  name: 'David Yates',
  birthyear: '10/8/1963',
  deathyear: 'alive',
  bio: 'is an English filmmaker who has directed feature films, short films, and television productions. Yates rose to mainstream prominence by directing the final four films in the Harry Potter series. His work on the series brought him major critical and commercial success along with accolades, such as the British Academy Britannia Award for Excellence in Directing. Yates\'s subsequent projects include The Legend of Tarzan and Fantastic Beasts and Where to Find Them (both 2016), and the sequel to Fantastic Beasts and Where to Find Them, Fantastic Beasts: The Crimes of Grindelwald (2018). Early in his career, Yates directed various short films and became a prolific television director. His credits include the six-part political thriller State of Play (2003), for which he won the Directors Guild of Great Britain Award for Outstanding Directorial Achievement, the adult two-part documentary drama Sex Traffic (2004) and the Emmy Award-winning television film The Girl in the Café (2005). Yates is a founding member of Directors UK.He has had a close partnership with Warner Bros. as a director and producer.',
},
];

// users of the app info
const users = [{
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
  res.json(mainMovies.find((movie) => { return movie.title === req.params.title; }));
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

// director information *all users
app.get('/directors', (req, res) => {
  res.json(directorInfo);
});

//Find a directors information *single
app.get('/directors/:director', (req, res) => {
  res.json(directorInfo.find((director) => { return director.name === req.params.director}));
})

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
app.put('/users/:username', function (req, res) {
  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    user.email = req.body.email;
    user.dob = req.body.dob;
    user.name = req.body.name;
    res.status(201).send('User ' + user.username + 'Updated user information to: email: ' + user.email + ' dob: ' + user.dob + ' name: ' + user.name);
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
