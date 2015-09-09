/**
 * searchResultsUIUpdater.js
 */

(function($) {
  'use strict';

  $.subscribe('search:jsonLoadError', function(event, data) {
    // TODO
    //  $('.error-search') 
  });
  
  $.subscribe('search:jsonLoadSuccess', function(event, data) {
    var markup = '';

    $.each(data.results, function(i, result) {
      /* TODO: highlight matching indices */
      markup += tmpl('tmpl_searchResult', result);
    });

    $('.list-results').html(markup);

    if (data.total === 1) {
      // If only one result, activate it
      $('.list-results li').first().addClass('result-active');
    }
  });

  $.subscribe('search:exitResults', function(event, data) {
    $('.list-results').empty();
  });
  
  $.subscribe('search:navigateResult', function(event, data) {
    $('.list-results .result-active').removeClass('result-active'); // for good measure

    var index = data.index || 0; // default to first item
    $('.list-results li').eq(index).addClass('result-active');
  });

  $.subscribe('search:selectResult', function(event, data) {
    var index = data.index || 0; // default to first item
    $('.list-results li').eq(index)
      .addClass('selected')
      .children('a')[0].click();
  });

})(jQuery);