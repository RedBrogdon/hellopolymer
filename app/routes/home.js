'use strict';

module.exports = function(app) {

    // Home route
    var home = require('../controllers/home');
    app.get('/', home.index);
    app.get('/fiddle', home.fiddle);
};
