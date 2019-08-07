var request = require('request'),
    username = "kare9001",
    password = "Technl98",
    url = "http://" + username + ":" + password + "@www.example.com";

request(
    {
        url : url
    },
    function (error, response, body) {
        // Do more stuff with 'body' here
    }
);