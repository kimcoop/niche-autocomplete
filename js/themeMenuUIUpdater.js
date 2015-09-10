/**
 * themeMenuUIUpdater.js
 */

require(['jquery', 'tinyPubSub'], function() {
  'use strict';

  $(function() {

    $.subscribe('theme:activate', function(event, data) {
      var themeIndex = data.theme || 0;
      $('.container-themes .theme-active').removeClass('theme-active');
      $('.container-themes li').eq(themeIndex).addClass('theme-active');
    });
  });

});