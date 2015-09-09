(function($) {
  'use strict';

  function SearchWidget($displayContainer) {
    this.$displayContainer = $displayContainer;
  }

  SearchWidget.prototype.fetch = function(searchTerm) {
    if (!searchTerm.length || !this.$displayContainer.length) {
      return;
    }

    var searchUrl = Constants.getSearchUrlForTerm(searchTerm),
      $display = this.$displayContainer;
      
    JSONPUtil.LoadJSONP(searchUrl, function(response) {
      var markup = '';

      $.each(response.results, function(i, result) {
        markup += tmpl('tmpl_searchResult', result);
      });

      /* Aggregate markup to minimize DOM manipulations */
      $display.html(markup);
    });
  }

  window.SearchWidget = window.SearchWidget || SearchWidget;

})(jQuery);