/**
 * autoCompleteActions.js
 */

(function($, SearchWidget, Constants) {
  'use strict';

    $(function() {

      $('.input-search').val(''); // Always clear on start

      $('.form-search').submit(function(e) {
        e.preventDefault(); // Enter keypress should not submit form
      });
      
      $('.form-search').on('blur', function() {
        // TODO
        $.publish('search:exitResults');
      });

      var Search = new SearchWidget();

      $('.input-search').on('keyup', function(e) {

        // TODO: repvent wandering cursor

        if (e.keyCode === Constants.keyCodes.ENTER && $('.list-results .active').length) {
          $.publish('search:selectResult', { index: $('.list-results .active').index() });
          return false;
        }

        if (e.keyCode === Constants.keyCodes.DOWN) {
          if ($('.list-results .active').next('li').length) {
            $.publish('search:navigateResult', { index: $('.list-results .active').index() + 1 });
          } else {  // Wrap or active first item, same effect
            $.publish('search:navigateResult', { index: 0 });
          }
          return false;
        }

        if (e.keyCode === Constants.keyCodes.UP) {
          if ($('.list-results .active').prev('li').length) {
            $.publish('search:navigateResult', { index: $('.list-results .active').index() - 1 });
          } else { // Wrap or active last item, same effect
            $.publish('search:navigateResult', { index: -1 });
          }
          return false;
        }
        
        Search.fetch( $(this).val().trim() );
        return false;
      });

    });

})(jQuery, SearchWidget, Constants);