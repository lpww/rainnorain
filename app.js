var connect = require('connect'),
    serveStatic = require('serve-static'),
    api = require('./api/request'),
    app = connect();

app.use(serveStatic(__dirname)).listen(3000);

app.use('/api', function apiResponse(req, res) {
    res.setHeader('Content-Type', 'application/json');

    api.get(function responseCallback(data) {
        res.end(data);
    });
});

console.log('Running app at http://localhost:3000');