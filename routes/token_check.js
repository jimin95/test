// API ROUTES -------------------
// ---------Route Middleware to Protext API Routes------
// This code is route Middleware to protect the 2 routes(/api, /api/users)

// get an instance of the router for api routes
// var apiRoutes = express.Router(); --> I'll use the 'apiRoutes' already made.

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
// ...

// route middleware to verify a token
var express = require('express');
var app = express();
var apiRoutes = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

apiRoutes.use(function (req, res, next) {
    // check header or url parameters or post parameters for token 
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    //decode token
    if (token) {
        //veriies secret and checks expires
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate!' });
            }
            else {
                //if everything is good, save to request for use in other routes 
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'NO token provied.'
        });
    }
});

module.exports = apiRoutes;