/**
 * searchWidget.js
 */

(function($, Constants) {
  'use strict';

  function SearchWidget($resultDisplay, $errorDisplay) {
    this.$resultDisplay = $resultDisplay;
    this.$errorDisplay = $errorDisplay;
  }

  SearchWidget.prototype.handleError = function(message) {
    message = message || Constants.SEARCH_ERROR_MSG_DEFAULT;

    this.$errorDisplay.html(message)
                      .removeClass('hidden');
  }

  SearchWidget.prototype.fetch = function(searchTerm) {
    if (!this.$resultDisplay || !this.$errorDisplay.length) {
      return;
    }

    /* If blank search, empty results */
    if (!searchTerm.length) {
      this.$resultDisplay.html('');
    }

    /* Hide error display */
    this.$errorDisplay.addClass('hidden');

    var searchUrl = Constants.getSearchUrlForTerm(searchTerm),
      $display = this.$resultDisplay;
      
    JSONPUtil.LoadJSONP(searchUrl, function(response) {
      /* If we don't get a response, something went wrong,
       * so let the user know there's an error */
      if (!response) {
        /* TODO: ensure this works */
        this.handleError();
        return;
      }

      var markup = '';

      $.each(response.results, function(i, result) {
        markup += tmpl('tmpl_searchResult', result);
      });

      /* Aggregate markup to minimize DOM manipulations */
      $display.html(markup);
    });
  }

  window.SearchWidget = window.SearchWidget || SearchWidget;

})(jQuery, Constants);