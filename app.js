var connect = require('connect'),
    serveStatic = require('serve-static'),
    api = require('./api/request'),
    app = connect();

// Routing for all static assets such as index.html
app.use(serveStatic(__dirname)).listen(3000);

// Specific routing for /api
app.use('/api', function apiResponse(req, res) {
    // Return the correct header
    res.setHeader('Content-Type', 'application/json');

    // Call api.get() to return a response when /api is visited
    api.get(function responseCallback(data) {
        res.end(data);
    });
});

console.log('Running app at http://localhost:3000');
