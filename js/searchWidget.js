/**
 * searchWidget.js
 */

(function($, Constants) {
  'use strict';

  function SearchWidget() {}

  SearchWidget.prototype.fetch = function(searchTerm) {

    // If blank search, render no results
    if (!searchTerm.length) {
      $.publish('search:exitResults');
    }

    var searchUrl = Constants.getSearchUrlForTerm(searchTerm);
      
    JSONPUtil.LoadJSONP(searchUrl, function(response) {
      // If we don't get a response, something went wrong,
      // so just let the user know there's an error
      if (!response) {
        $.publish('search:jsonLoadError', { message: Constants.SEARCH_ERROR_MSG_DEFAULT });
        return;
      }

      $.publish('search:jsonLoadSuccess', response);
    });
  }

  window.SearchWidget = window.SearchWidget || SearchWidget;

})(jQuery, Constants);