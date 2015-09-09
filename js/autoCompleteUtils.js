/**
 * autoCompleteUtils.js
 */

 (function($) {
  'use strict';

    $(function() {

      var search = new SearchWidget( $('.container-results') );

      $('.input-search').on('keypress', function() {
        search.fetch( $(this).val().trim() );
      });
    });

 })(jQuery);