'use strict';

var config = require('../../config/config'),
    rest = require('restler'),
    _ = require('lodash');

exports.NYTNewswire = function(req, res) {
  var cacheItem = global.infoCache.get('NYTNewswire');
  if (cacheItem && (cacheItem.timestamp >= Date.now() - 600000)) {
    // cache has articles less than ten minutes old
    res.status(200).send(cacheItem.articles);
  }
  else
  {
    rest.get(config.NewYorkTimes.NewswireUrl)
    .on('complete', function(result) {
      if ((result instanceof Error) || (result.status !== 'OK')) {
        console.log('Error:', result.message);
        res.status(500).send('{ "message": "Could not retrieve newswire." }');
      } else {
        var newArticles = _.map(result.results, function (rec) {
          return { "title": rec.title, "abstract": rec.abstract, "url": rec.url, "thumbnail_standard": rec.thumbnail_standard };
        });
        global.infoCache.set('NYTNewswire', { timestamp: Date.now(), articles: newArticles });
        res.status(200).send(newArticles);
      }
    });
  }
};
