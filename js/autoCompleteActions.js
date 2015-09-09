/**
 * autoCompleteActions.js
 */

 (function($, SearchWidget) {
  'use strict';

    $(function() {

      /* Search v1 */
      var Search = new SearchWidget( $('.list-results'), $('.error-search') );

      $('.input-search').on('keyup', function(e) {
        // TODO: detect arrow actions
        // TODO: use jq triggers
        Search.fetch( $(this).val().trim() );
      });

/*
Y U NO WORK
      $('.list-results').delegate('a', 'hover', function(e) {
        debugger;
        $('.list-results a').removeClass('active');
        $(this).addClass('active');
      });*/

      /* Search v2
      var SearchV2 = new SearchWidget( $('.list-results-v2') );

      $('.input-search-v2').on('keypress', function() {
        SearchV2.fetch( $(this).val().trim() );
      }); */

    });

 })(jQuery, SearchWidget);