
'use strict';
const {User, Score} = require('../models/model.js');

exports.addUser = function(req, res) {
    var newUser = new User(req.body);
    console.log(req.body);
    User.addUser(req.app.locals.users, newUser, function(err, result) {
        if(err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

exports.getUser = function(req, res) {
   /* TO DO: Insert code here */
   User.getUser(req.app.locals.users, req.params.userId, function(err, result) {
       if (err) {
         res.send(err);
       } else {
         res.json(result);
       }
   });
};


exports.updateScore = function(req, res) {
    /* TO DO: Insert code here */
    User.updateScore(req.app.locals.users, req.params.userId, new Score(req.body), function(err,result) {
      if (err) {
          res.send(err);
      } else {
          res.json(result);
      }
    });

};

exports.getAllUsers = function(req, res) {
    User.getAllUsers(req.app.locals.users, req.query.sortBy, function(err, result) {
        if(err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

