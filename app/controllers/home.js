'use strict';

exports.index = function(req, res) {
    res.render('home/index');
};

exports.fiddle = function(req, res) {
    res.render('home/fiddle');
};

exports.gmailOAuth2Callback = function(req, res) {
    res.render('home/gmailoauth2callback');
};
