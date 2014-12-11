"use strict"

var connect = require('connect'),
    serveStatic = require('serve-static'),
    api = require('./api/request'),
    app = connect(),
    querystring = require('querystring');

// Routing for all static assets such as index.html
app.use(serveStatic(__dirname)).listen(process.env.PORT);

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

console.log('Running app at http://localhost:');


