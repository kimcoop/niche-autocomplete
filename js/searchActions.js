/**
 * autoCompleteActions.js
 */

 define(['constants', 'searchService', 'jquery', 'tinyPubSub'], function(Constants, SearchService) {
  'use strict';

  $(function() {

    $('.input-search').val(''); // Ensure input is clear on start

    $('.form-search').submit(function(e) {
      e.preventDefault(); // Enter keypress should not submit form
    });
    
    $(document).on('blur', '.form-search', function(e) {
      if (!$(event.relatedTarget).parents('.result').length) {
        $.publish('search:exitResults'); // Don't fire event if event is clicking on a search result
      }
    });

    $('.input-search').keydown(function(e) {
      if (e.keyCode === Constants.keyCodes.UP) { // Prevent wandering cursor
          return false;
      }
      return true;
    });

    $('.list-results').on('mouseenter', 'li', function() {
      $.publish('search:navigateResult', { index: $(this).index() });
    }).on('mouseleave', 'li', function() {
      $.publish('search:exitResult');
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
      
      SearchService.fetch( $(this).val().trim() );
      return false;
    });

  });
});