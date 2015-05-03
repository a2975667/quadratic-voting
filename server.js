var connect = require('connect');
var serveStatic = require('serve-static');
var directory = __dirname + '/app';
var port = 1248;
connect().use(serveStatic(directory)).listen(1248);
console.log('Server running at http://localhost:' + port + '/ from ', directory);