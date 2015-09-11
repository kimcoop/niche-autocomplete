/**
 * searchInputUIUpdater.js
 */

require(['tinyPubSub', 'jquery'], function() {
  'use strict';

  var populateInput = function(data) {
    var index = data.index || 0; // default to first item
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

  $.subscribe('search:exitResult', function(event, data) {
    $('.input-search').val('');
  });

});