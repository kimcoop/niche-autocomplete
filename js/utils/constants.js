/**
 * constants.js
 */

define(function() {
 'use strict';
    
  var Constants = {
    URL_SEARCH_BASE: 'http://niche-recruiting-autocomplete.appspot.com/search/?query=',
    ERROR_SEARCH_DEFAULT: 'We\'re sorry, but something went wrong with your search. Please try again.',
    
    keyCodes: {
      ENTER: 13,
      UP: 38,
      DOWN: 40,
      ESCAPE: 27
    },

    getSearchUrlForTerm: function(term) {
      return Constants.URL_SEARCH_BASE + term;
    },

    getResultsTextForNum: function(num) {
      var noun = num === 1 ? 'result' : 'results';
      return num + ' ' + noun;
    }
  };

  return Constants;

});