var restify          = require('restify');
var restifyValidator = require('restify-validator');
var setupController  = require('./controllers/setupController.js');
var userController   = require('./controllers/userController.js');
var server           = restify.createServer();

setupController(server, restify, restifyValidator);
userController(server);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});