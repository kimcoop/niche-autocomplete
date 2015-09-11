/**
 * numResultsUIUpdater.js
 */

require(['constants', 'tinyPubSub', 'jquery'], function(Constants) {
  'use strict';

  $.subscribe('search:exitResults', function(event, data) {
    $('.num-results').text('');
  });

  $.subscribe('search:jsonLoadSuccess', function(event, data) {
    $('.num-results').text(Constants.getResultsTextForNum(data.total));
  });

});