/**
 * themeActions.js
 */

(function($) {
  'use strict';

    $(function() {
      $('.container-themes').delegate('li', 'click', function(e) {
        e.preventDefault();
        var theme = $(this).data('theme');

        $.publish('theme:activate', { theme: theme });

        // TODO; publish ~ theme:activate ()
      });
    });

    // themeMenuUIupdater.js
    $.subscribe('theme:activate', function(event, data) {
      var themeIndex = data.theme || 0; // default to theme 0
      $('.container-themes .theme-active').removeClass('theme-active');
      $('.container-themes li').eq(themeIndex).addClass('theme-active');
    });

    // themeUIUpdater.js
    $.subscribe('theme:activate', function(event, data) {
      var themeClass = ('theme-' + data.theme) || 'theme-0'; // default to theme 0

      $('.container-autocomplete')
        .removeClass('theme-0 theme-1')
        .addClass(themeClass);
    });

})(jQuery);