/**
 * searchActions.js
 *
 * Note: Can be broken out further as needed 
 * to control module bloat
 */

require(['constants', 'jquery', 'tinyPubSub'], function(Constants) {
  'use strict';

  $(function() {

    $('.input-search').val(''); // Ensure input is clear on start

    $('.form-search').submit(function(e) {
      e.preventDefault(); // Enter keypress should not submit form
    });

    $(document).on('click', function(e) {
      // Blur doesn't quite cut it since click event (on .result, for ex)
      // fires after blur, so clicking .result will :exitResults first
      if (!$(e.target).parents('.form-search').length) {
        $.publish('search:exitResults');
      }
    });

    $('.link-search').click(function(e) {
      e.preventDefault();
      var $activeResult = $('.list-results .result-active');

      // If search icon is clicked *and* there's an active result,
      // navigate to it. Otherwise, no-op
      if ($activeResult.length) {
        $.publish('search:selectResult', {
          index: $activeResult.index()
        });
      }
    });

    $('.input-search').keydown(function(e) {
      if (e.keyCode === Constants.keyCodes.UP) { // Prevent wandering cursor
        return false;
      }
    });

    $('.list-results').on('mouseenter', 'li', function() {
      $.publish('search:activateResult', {
        index: $(this).index()
      });
    }).on('mouseleave', 'li', function() {
      $.publish('search:exitResult');
    }).on('click', 'li', function(e) {
      $.publish('search:selectResult', {
        index: $(this).index()
      });
    });

    $('.input-search').on('keyup', function(e) {

      if (e.keyCode === Constants.keyCodes.ESCAPE) {
        $.publish('search:exitResults');
        return false;
      }

      var $activeResult = $('.list-results .result-active'),
        activeIndex = $activeResult.index();

      if (e.keyCode === Constants.keyCodes.ENTER && $activeResult.length) {
        $.publish('search:selectResult', {
          index: activeIndex
        });
      } else if (e.keyCode === Constants.keyCodes.DOWN) {
        $.publish('search:activateResult', {
          index: $activeResult.next('li').length ? activeIndex + 1 : 0
        });
      } else if (e.keyCode === Constants.keyCodes.UP) {
        $.publish('search:activateResult', {
          index: $activeResult.prev('li').length ? activeIndex - 1 : -1
        });
      } else {
        $.publish('search:new', {
          searchTerm: $(this).val().trim()
        });
      }

      return false;
    });

  });
});