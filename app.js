"use strict"

var express = require('express'),
    serveStatic = require('serve-static'),
    api = require('./api/request'),
    app = express(),
    querystring = require('querystring');

// Routing for all static assets such as index.html
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// Specific routing for /api
app.use('/api', function apiResponse(req, res) {
    // Return the correct header
    res.setHeader('Content-Type', 'application/json');

    // Parse query into an object
    var query = querystring.parse(req.url.replace('/?', ''));

    // Call api.get() to return a response when /api is visited
    api.get(query, function responseCallback(data) {
        res.end(data);
    });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


