
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var login = require('./routes/login');
var http = require('http');
var path = require('path');
var port = process.env.PORT || 3000,
     url = 'http://localhost:' + port + '/';

if(process.env.SUBDOMAIN){
  url = 'http://' + process.env.SUBDOMAIN + '.jit.su/';
}

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://nodejitsu:543b8727185f915b4e641419b3b786e1@paulo.mongohq.com:10080/nodejitsudb4369617959');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connection to mongodb Successful!');
});



// all environments
app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/create', routes.create);
app.get('/delete/:id', routes.delete);
app.get('/list', routes.list);
app.get('/partials/:filename', routes.partials);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log('The http server has started at: ' + url);
});
