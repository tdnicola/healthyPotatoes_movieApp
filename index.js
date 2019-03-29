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

//  older set up
//
// var timestamp = new Date();
//
// http.createServer((request, response) => {
//   var addr = request.url,
//   q = url.parse(addr, true),
//   filePath = '';
//
//   // adding what filePath means
//   if (q.pathname.includes('documentation')) {
//     filePath = './documentation.html';
//   } else {
//     filePath = './index.html';
//   }
//
//   fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + timestamp + '\n\n', function(err) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       console.log('Added to log');
//       };
//   });
//
//   fs.readFile(filePath, function (err, data) {
//     if (err) {
//       throw err;
//     }
//
//     response.writeHead(200, { 'Content-Type': 'text/html' });
//     response.write(data);
//     response.end('Healthy potatos');
//   });
//
// }).listen(8080);
