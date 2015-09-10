/**
 * autoCompleteActions.js
 */

 require(['constants', 'searchWidget', 'jquery', 'tinyPubSub'], function(Constants, SearchWidget) {
  'use strict';

    $(function() {

      $('.input-search').val(''); // Always clear on start

      $('.form-search').submit(function(e) {
        e.preventDefault(); // Enter keypress should not submit form
      });
      
      $(document).on('blur', '.form-search', function(e) {
        if (!$(event.relatedTarget).parent('li').length) {
          $.publish('search:exitResults');
        }
      });

      $('.input-search').keydown(function(e) {
        // Prevent wandering cursor
        if (e.keyCode === Constants.keyCodes.UP) {
            return false;
        }
        return true;
      });

      $('.list-results').on('mouseenter', 'li', function() {
        $.publish('search:navigateResult', { index: $(this).index() });
      }).on('mouseleave', 'li', function() {
        // TODO
        $('.input-search').val('');
        $('.list-results .result-active').removeClass('result-active');
      });

      $('.input-search').on('keyup', function(e) {

        if (e.keyCode === Constants.keyCodes.ESCAPE) {
          $.publish('search:exitResults');
          return false;
        }

        if (e.keyCode === Constants.keyCodes.ENTER && $('.list-results .result-active').length) {
          $.publish('search:selectResult', { index: $('.list-results .result-active').index() });
          return false;
        }

        if (e.keyCode === Constants.keyCodes.DOWN) {
          if ($('.list-results .result-active').next('li').length) {
            $.publish('search:navigateResult', { index: $('.list-results .result-active').index() + 1 });
          } else { // Wrap or activate first item, same effect
            $.publish('search:navigateResult', { index: 0 });
          }
          return false;
        }

        if (e.keyCode === Constants.keyCodes.UP) {
          if ($('.list-results .result-active').prev('li').length) {
            $.publish('search:navigateResult', { index: $('.list-results .result-active').index() - 1 });
          } else { // Wrap or activate last item, same effect
            $.publish('search:navigateResult', { index: -1 });
          }
          return false;
        }
        
        SearchWidget.fetch( $(this).val().trim() );
        return false;
      });

    });

});