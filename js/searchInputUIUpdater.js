/**
 * searchInputUIUpdater.js
 */

require(['tinyPubSub', 'jquery'], function() {
  'use strict';

  var originalSearchTerm = ''; // Store this to recall on result mouseout

  var populateInput = function(data) {
    var index = data.index || 0;
    var selectionName = $('.list-results li').eq(index).data('name');
    $('.input-search').val(selectionName);
  };

  $.subscribe('search:selectResult', function(event, data) {
    populateInput(data);
  });

  $.subscribe('search:activateResult', function(event, data) {
    populateInput(data);
  });

  $.subscribe('search:exitResults', function(event, data) {
    $('.input-search').val('');
  });

  $.subscribe('search:jsonLoadSuccess', function(event, data) {
    originalSearchTerm = data.searchTerm;
  });

  $.subscribe('search:exitResult', function(event, data) {
    $('.input-search').val(originalSearchTerm);
  });

});