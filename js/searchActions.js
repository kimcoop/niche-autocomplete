/**
 * searchActions.js
 */

 require(['constants', 'searchService', 'jquery', 'tinyPubSub'], function(Constants, SearchService) {
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
      $.publish('search:activateResult', { index: $(this).index() });
    }).on('mouseleave', 'li', function() {
      $.publish('search:exitResult');
    });

    $('.input-search').on('keyup', function(e) {

      if (e.keyCode === Constants.keyCodes.ESCAPE) {
        $.publish('search:exitResults');
        return false;
      }

      var $activeResult = $('.list-results .result-active'),
        activeIndex = $activeResult.index(),
        nextIndex;

      if (e.keyCode === Constants.keyCodes.ENTER && $activeResult.length) {
        $.publish('search:selectResult', { index: activeIndex });
      } else if (e.keyCode === Constants.keyCodes.DOWN) {
        nextIndex = $activeResult.next('li').length ? activeIndex + 1 : 0;
        $.publish('search:activateResult', { index: nextIndex });
      } else if (e.keyCode === Constants.keyCodes.UP) {
        nextIndex = $activeResult.prev('li').length ? activeIndex - 1 : -1;
        $.publish('search:activateResult', { index: nextIndex });
      } else {
        SearchService.fetch( $(this).val().trim() );
      }
      
      return false;
    });

  });
});