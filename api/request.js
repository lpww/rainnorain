// Import our hidden endpoint and the Node HTTP module
var endpoint = require('./endpoint'),
    http = require('http');

module.exports = {
    // Our single method for retrieving data
    get: function getResponse(callback) {

        // Make a get request on our endpoint
        // Returns an IncomingMessage object (res)
        http.get(endpoint, function httpGetRequest(res){
            // This stores our returned data
            var data = '';

            // This ensures our data is formatted correctly
            res.setEncoding('utf8');

            // The data event can be called multiple times with different
            // chunks of the requested data
            // (because of the asynchronous nature of the function)

            // Here we append it to the data var to make sure we return
            // a complete JSON object
            res.on('data', function onBodyResponse(chunk) {
                data += chunk;
            });

            // Fire our callback once the request is fully returned
            res.on('end', function onBodyResponse() {
                callback(data);
            });
        });
    }
};
