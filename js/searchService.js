/**
 * searchService.js
 */

require(['constants', 'jquery', 'tinyPubSub'], function(Constants) {
  'use strict';

  var search = function(searchTerm) {
    // If blank search, render no results
    if (!searchTerm.length) {
      $.publish('search:exitResults');
      return;
    }

    var searchUrl = Constants.getSearchUrlForTerm(searchTerm);

    JSONPUtil.LoadJSONP(searchUrl, function(response) {
      // If we don't get a response, something went wrong,
      // so just let the user know there's an error
      if (!response) {
        $.publish('search:jsonLoadError', {
          message: Constants.ERROR_SEARCH_DEFAULT
        });
        return;
      }

      $.publish('search:jsonLoadSuccess', response);
    });
  };

  $.subscribe('search:new', function(event, data) {
    search(data.searchTerm);
  });

});