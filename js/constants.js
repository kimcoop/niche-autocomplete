/**
 * constants.js
 */

(function() {
 'use strict';
    
  var Constants = {
    URL_SEARCH_BASE: 'http://niche-recruiting-autocomplete.appspot.com/search/?query=',
    SEARCH_ERROR_MSG_DEFAULT: 'We\'re sorry, but something went wrong with your search',

    getSearchUrlForTerm: function(term) {
      return Constants.URL_SEARCH_BASE + term;
    }
  };

  window.Constants = window.Constants || Constants;

})();