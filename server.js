var express   = require('express');
var basicAuth = require('basic-auth');
var app       = express();
var auth      = function(username, password) {
  return function(req, res, next) {
    var user = basicAuth(req);

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    }

    next();
  };
};

app.use( "/", [ auth('hackers','founders'), express.static( __dirname + "/build" ) ]);
app.listen(9090);
