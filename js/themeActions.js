/**
 * themeActions.js
 */

require(['jquery', 'tinyPubSub'], function() {
  'use strict';

    $(function() {
      $('.container-themes').delegate('li', 'click', function(e) {
        e.preventDefault();
        var theme = $(this).data('theme');

        $.publish('theme:activate', { theme: theme });
      });
    });
    
});