/**
 * autoCompleteActions.js
 */

(function($, SearchWidget, Constants) {
  'use strict';

    $(function() {

      $('.form-search').submit(function(e) {
        e.preventDefault();
      });

      var Search = new SearchWidget();

      $('.input-search').on('keyup', function(e) {
        // TODO: prevent text input cursor from wandering

        if (e.keyCode === Constants.keyCodes.ENTER && $('.list-results .active').length) {
          // TODO: what time of js comment is best inline?
          $.publish('search:selectResult', { index: $('.list-results .active').index() });
          return;
        }

        if (e.keyCode === Constants.keyCodes.DOWN) {
          if ($('.list-results .active').next('li').length) {
            $.publish('search:navigateResult', { index: $('.list-results .active').index() + 1 });
          } else {  // Wrap or active first item, same effect
            $.publish('search:navigateResult', { index: 0 });
          }
          return;
        }

        if (e.keyCode === Constants.keyCodes.UP) {
          if ($('.list-results .active').prev('li').length) {
            $.publish('search:navigateResult', { index: $('.list-results .active').index() - 1 });
          } else { // Wrap or active last item, same effect
            $.publish('search:navigateResult', { index: -1 });
          }
          return;
        }
        
        Search.fetch( $(this).val().trim() );
      });

    });

})(jQuery, SearchWidget, Constants);