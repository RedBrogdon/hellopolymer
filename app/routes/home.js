'use strict';

module.exports = function(router) {

    // Home route
    var home = require('../controllers/home');
    router.get('/', home.index);
    router.get('/fiddle', home.fiddle);
    router.get('/gmailoauth2callback', home.gmailOAuth2Callback);
};
