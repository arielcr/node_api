module.exports = function (server, restify, restifyValidator) {
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    server.use(restifyValidator);

    // BasicAuth
    server.use(restify.authorizationParser());
    server.use(function (req, res, next) {
        var apiKeys = {
            'user1': 'TNPGABh69Dz9U6PVLpxgtUhz7PBm2mwA'
        };
        if (typeof (req.authorization.basic) === 'undefined' || !apiKeys[req.authorization.basic.username] || req.authorization.basic.password !== apiKeys[req.authorization.basic.username]) {
            var response = {
                'status': 'failure',
                'data': 'You must specify a valid API key'
            };
            res.setHeader('content-type', 'application/json');
            res.writeHead(403);
            res.end(JSON.stringify(response));
            return next();
        }
        return next();
    });

    server.use(function (req, res, next) {
        var whitelistedIps = ['111.222.333.444'];
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;


    });

};