/**
 * searchTipUIUpdater.js
 */

(function($, Constants) {
  'use strict';
  
  $.subscribe('search:jsonLoadSuccess', function(event, data) {
    if (data.total > 0) {
      // Display search tip now, but don't hide it again (avoid noisy UX)
      $('.search-tip').removeClass('hidden');
    }
  });

})(jQuery);