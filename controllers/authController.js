var helpers = require('../config/helperFunctions.js');

// BasicAuth
module.exports.apiKey = function (req, res, next) {
    var apiKeys = {
        'user1': 'TNPGABh69Dz9U6PVLpxgtUhz7PBm2mwA'
    };
    if (typeof (req.authorization.basic) === 'undefined' || !apiKeys[req.authorization.basic.username] || req.authorization.basic.password !== apiKeys[req.authorization.basic.username]) {
        return helpers.failure(res, next, 'You must specify a valid API key', 403);
    }
    return next();
};

// IP Whitelisting
module.exports.ipWhitelisting = function (req, res, next) {
    var whitelistedIps = ['111.222.333.444'];
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (whitelistedIps.indexOf(ip) === -1) {
        return helpers.failure(res, next, 'Invalid IP Address', 403);
    }
    return next();
};

// API Throttling
module.exports.apiThrottling = {
    rate: 1,
    burst: 2,
    xff: true
};