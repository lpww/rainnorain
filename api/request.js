"use strict"

// Import our hidden credentials and the Node HTTP module
var credentials = require('./credentials'),
    http = require('http'),
    querystring = require('querystring');

// Builds a full request URL
// by combining the basic API URL
// our hidden credentials
// and the requested params
function buildRequest(query, credentials) {
    var url = "http://api.aerisapi.com/batch/:auto?requests=/places/,/forecasts/?filter=6hr&plimit=3&from=today+T06:00:00-08:00&",
        params = credentials;

    for (var param in query) {
        params[param] = query[param];
    }

    console.log(url + querystring.stringify(params));

    return url + querystring.stringify(params);
}

module.exports = {
    // Our single method for retrieving data
    get: function getResponse(query, callback) {

        // Make a get request on our endpoint
        // Returns an IncomingMessage object (res)
        http.get(buildRequest(query, credentials), function httpGetRequest(res){
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
