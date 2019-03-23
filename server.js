let http = require('http'),
  url = require('url'),
  fs = require('fs');

var timestamp = new Date();

http.createServer((request, response) => {
  var addr = request.url,
  q = url.parse(addr, true),
  filePath = '';

  // adding what filePath means
  if (q.pathname.includes('documentation')) {
    filePath = './documentation.html';
  } else {
    filePath = './index.html';
  }

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + timestamp + '\n\n', function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Added to log');
      };
  });

  fs.readFile(filePath, function (err, data) {
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end('Healthy potatos');
  });

}).listen(8080);
