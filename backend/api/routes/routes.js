'use strict';

module.exports = function(app) {
    var con = require('../controllers/controller');

    app.route('/users')
        .post(con.addUser)
        .get(con.getAllUsers);
    
    app.route('/users/:userId')
        .get(con.getUser)
        .put(con.updateScore);
};