var auth = require('./authController.js');

module.exports = function (server, restify, restifyValidator) {
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    server.use(restifyValidator);
    server.use(restify.authorizationParser());

    server.use(auth.ipWhitelisting);
    server.use(auth.apiKey);
    server.use(restify.throttle(auth.apiThrottling));
};