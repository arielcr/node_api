var helpers = require('../config/helperFunctions.js');
var UserModel = require('../models/userModel.js');

module.exports = function (server) {

    server.get("/", function (req, res, next) {
        UserModel.find({}, function (err, users) {
            if (err) {
                return helpers.failure(res, next, 'Something went wrong while fetching the users from the database', 500);
            }
            return helpers.success(res, next, users);
        });
    });

    server.get("/user/:id", function (req, res, next) {
        req.assert('id', 'Id is required and must be numeric').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            return helpers.failure(res, next, errors[0], 400);
        }
        UserModel.findOne({ _id: req.params.id }, function (err, user) {
            if (err) {
                return helpers.failure(res, next, 'Something went wrong while fetching the user from the database', 500);
            }
            if (user === null) {
                return helpers.failure(res, next, 'The specified user could not be found in the database', 404);
            }
            return helpers.success(res, next, user);
        });
    });

    server.post("/user", function (req, res, next) {
        req.assert('first_name', 'First name is required').notEmpty();
        req.assert('last_name', 'Last name is required').notEmpty();
        req.assert('email_address', 'Email address is required and must be a valid email').notEmpty().isEmail();
        req.assert('career', 'The career must be either student, teacher or professor').isIn(['student', 'teacher', 'professor']);
        var errors = req.validationErrors();
        if (errors) {
            return helpers.failure(res, next, errors, 400);
        }

        var user = new UserModel();
        user.first_name = req.params.first_name;
        user.last_name = req.params.last_name;
        user.email_address = req.params.email_address;
        user.career = req.params.career;
        user.save(function (err) {
            if (err) {
                return helpers.failure(res, next, 'Error saving the user to the database', 500);
            }
            return helpers.success(res, next, user);
        });
    });

    server.put("/user/:id", function (req, res, next) {
        req.assert('id', 'Id is required and must be numeric').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            return helpers.failure(res, next, errors[0], 400);
        }

        UserModel.findOne({ _id: req.params.id }, function (err, user) {
            if (err) {
                return helpers.failure(res, next, 'Something went wrong while fetching the user from the database', 500);
            }
            if (user === null) {
                return helpers.failure(res, next, 'The specified user could not be found in the database', 404);
            }
            var updates = req.params;
            delete updates.id;

            for (var field in updates) {
                user[field] = updates[field];
            }

            user.save(function (err) {
                if (err) {
                    return helpers.failure(res, next, 'Error saving the user to the database', 500);
                }
                return helpers.success(res, next, user);
            });
        });
    });

    server.del("/user/:id", function (req, res, next) {
        req.assert('id', 'Id is required and must be numeric').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            return helpers.failure(res, next, errors[0], 400);
        }

        UserModel.findOne({ _id: req.params.id }, function (err, user) {
            if (err) {
                return helpers.failure(res, next, 'Something went wrong while fetching the user from the database', 500);
            }
            if (user === null) {
                return helpers.failure(res, next, 'The specified user could not be found in the database', 404);
            }
            
            user.remove(function (err) {
                if (err) {
                    return helpers.failure(res, next, 'Error removing the user in the database', 500);
                }
                return helpers.success(res, next, user);
            });
        });
    });

};
