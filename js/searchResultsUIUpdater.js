/**
 * searchResultsUIUpdater.js
 */

require(['jquery', 'microtemplate', 'tinyPubSub'], function() {
  'use strict';

  $.subscribe('theme:activate', function(event, data) {
    var themeClass = ('theme-' + data.theme) || 'theme-0';

    $('.container-autocomplete')
      .removeClass('theme-0 theme-1')
      .addClass(themeClass);
  });

  $.subscribe('search:jsonLoadError', function(event, data) {
    $('.error-search').text(data.message)
      .removeClass('hidden');
  });

  $.subscribe('search:jsonLoadSuccess', function(event, data) {
    $('.error-search').addClass('hidden'); // Ensure error display is hidden

    var markup = data.results.map(function(result) {
      return tmpl('tmpl_searchResult', result);
    }).join('');

    $('.list-results').html(markup);

    if (data.total === 1) {
      $('.list-results li').first().addClass('result-active'); // If only one result, activate it
    }
  });

  $.subscribe('search:exitResults', function(event, data) {
    $('.list-results').empty();
  });

  $.subscribe('search:exitResult', function(event, data) {
    $('.list-results .result-active').removeClass('result-active');
  });

  $.subscribe('search:activateResult', function(event, data) {
    $('.list-results .result-active').removeClass('result-active'); // For good measure

    var index = data.index || 0;
    $('.list-results li').eq(index).addClass('result-active');
  });

  $.subscribe('search:selectResult', function(event, data) {
    var index = data.index || 0;
    $('.list-results li').eq(index)
      .addClass('result-selected')
      .children('a')[0].click();
  });

});