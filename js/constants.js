/**
 * constants.js
 */

(function() {
 'use strict';
    
  var Constants = {
    URL_SEARCH_BASE: 'http://niche-recruiting-autocomplete.appspot.com/search/?query=',

    getSearchUrlForTerm: function(term) {
      return Constants.URL_SEARCH_BASE + term;
    }
  };

  window.Constants = window.Constants || Constants;

})();