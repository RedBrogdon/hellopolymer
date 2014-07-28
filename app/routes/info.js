'use strict';

module.exports = function(router) {

    // Home route
    var info = require('../controllers/info');
    router.get('/info/NYTNewswire', info.NYTNewswire);
};
