var endpoint = require('./endpoint'),
    http = require('http');

module.exports = {
    get: function getResponse(callback) {
        http.get(endpoint, function httpGetRequest(res){
            var data = '';

            res.setEncoding('utf8');

            res.on('data', function onBodyResponse(chunk) {
                data += chunk;
            });

            res.on('end', function onBodyResponse() {
                callback(data);
            });
        });
    }
};