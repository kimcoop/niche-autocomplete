/**
 * JSONPUtil.js
 *
 * Borrowed gratefully from Shoefitr.com
 */

var JSONPUtil = {

  _oJsonpRequests: {},

  _iJsonpRequestCount: 0,

  DispatchJsonpResponse: function(oResponse, sEcho) {
    // sEcho contains the request id
    var callback = this._oJsonpRequests[sEcho];
    delete this._oJsonpRequests[sEcho];

    if (callback) {
      callback(oResponse);
    }
  },

  // Note that query string variables 'callback' and 'echo' are appended to sUrl, so your request URL
  // must not contain either of these. Also be sure to append "?sid=" + Math.random() to the URL to avoid
  // cache hits.
  LoadJSONP: function(sUrl, f) {
    // sEcho contains the request id
    var sEcho = this._iJsonpRequestCount++;
    this._oJsonpRequests[sEcho] = f;

    var script = document.createElement('script');
    script.setAttribute('src', sUrl +
      '&callback=JSONPUtil.DispatchJsonpResponse' +
      '&echo=' + sEcho
    );
    document.body.appendChild(script);
  }
};
define("jsonp", function(){});

/**
 * constants.js
 */

define('constants',[],function() {
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
/**
 * tinyPubSub.js
 *
 * jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * http://benalman.com/
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL 
 */

define('tinyPubSub',['jquery'], function() {

  var o = $({});

  $.subscribe = function() {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    o.trigger.apply(o, arguments);
  };

});
/**
 * numResultsUIUpdater.js
 */

require(['constants', 'tinyPubSub', 'jquery'], function(Constants) {
  'use strict';

  $.subscribe('search:exitResults', function(event, data) {
    $('.num-results').text('');
  });

  $.subscribe('search:jsonLoadSuccess', function(event, data) {
    $('.num-results').text(Constants.getResultsTextForNum(data.total));
  });

});
define("numResultsUIUpdater", function(){});

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
define("searchActions", function(){});

/**
 * searchInputUIUpdater.js
 */

require(['tinyPubSub', 'jquery'], function() {
  'use strict';

  var originalSearchTerm = ''; // Store this to recall on result mouseout

  var populateInput = function(data) {
    var index = data.index || 0;
    var selectionName = $('.list-results li').eq(index).data('name');
    $('.input-search').val(selectionName);
  };

  $.subscribe('search:selectResult', function(event, data) {
    populateInput(data);
  });

  $.subscribe('search:activateResult', function(event, data) {
    populateInput(data);
  });

  $.subscribe('search:exitResults', function(event, data) {
    $('.input-search').val('');
  });

  $.subscribe('search:new', function(event, data) {
    originalSearchTerm = data.searchTerm;
  });

  $.subscribe('search:exitResult', function(event, data) {
    $('.input-search').val(originalSearchTerm);
  });

});
define("searchInputUIUpdater", function(){});

/**
 * microtemplate.js
 * 
 * Simple JavaScript Templating
 * John Resig - http://ejohn.org/ - MIT Licensed
 */

(function() {
  var cache = {};
 
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
     
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
       
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
   
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();
define("microtemplate", function(){});

/**
 * searchResultsUIUpdater.js
 */

require(['jquery', 'microtemplate', 'tinyPubSub'], function() {
  'use strict';

  $.subscribe('theme:activate', function(event, data) {
    var themeClass = ('theme-' + data.theme) || 'theme-0';

    $('.container-autocomplete')
      .removeClass('theme-0 theme-1')
      .addClass(themeClass);
  });

  $.subscribe('search:jsonLoadError', function(event, data) {
    $('.error-search').text(data.message)
      .removeClass('hidden');
  });

  $.subscribe('search:jsonLoadSuccess', function(event, data) {
    $('.error-search').addClass('hidden'); // Ensure error display is hidden

    var markup = '';

    $.each(data.results, function(i, result) {
      markup += tmpl('tmpl_searchResult', result);
    });

    $('.list-results').html(markup);

    if (data.total === 1) {
      $('.list-results li').first().addClass('result-active'); // If only one result, activate it
    }
  });

  $.subscribe('search:exitResults', function(event, data) {
    $('.list-results').empty();
  });

  $.subscribe('search:exitResult', function(event, data) {
    $('.list-results .result-active').removeClass('result-active');
  });

  $.subscribe('search:activateResult', function(event, data) {
    $('.list-results .result-active').removeClass('result-active'); // For good measure

    var index = data.index || 0;
    $('.list-results li').eq(index).addClass('result-active');
  });

  $.subscribe('search:selectResult', function(event, data) {
    var index = data.index || 0;
    $('.list-results li').eq(index)
      .addClass('result-selected')
      .children('a')[0].click();
  });

});
define("searchResultsUIUpdater", function(){});

/**
 * searchService.js
 */

require(['constants', 'jquery', 'tinyPubSub'], function(Constants) {
  'use strict';

  var search = function(searchTerm) {
    // If blank search, render no results
    if (!searchTerm.length) {
      $.publish('search:exitResults');
    }

    var searchUrl = Constants.getSearchUrlForTerm(searchTerm);

    JSONPUtil.LoadJSONP(searchUrl, function(response) {
      // If we don't get a response, something went wrong,
      // so just let the user know there's an error
      if (!response) {
        $.publish('search:jsonLoadError', {
          message: Constants.ERROR_SEARCH_DEFAULT
        });
        return;
      }

      $.publish('search:jsonLoadSuccess', response);
    });
  };

  $.subscribe('search:new', function(event, data) {
    search(data.searchTerm);
  });

});
define("searchService", function(){});

/**
 * themeActions.js
 */

require(['jquery', 'tinyPubSub'], function() {
  'use strict';

  $(function() {
    $('.container-themes').delegate('li', 'click', function(e) {
      e.preventDefault();
      var theme = $(this).data('theme');
      $.publish('theme:activate', {
        theme: theme
      });
    });
  });

});
define("themeActions", function(){});

/**
 * themeMenuUIUpdater.js
 */

require(['jquery', 'tinyPubSub'], function() {
  'use strict';

  $.subscribe('theme:activate', function(event, data) {
    var themeIndex = data.theme || 0;
    $('.container-themes .theme-active').removeClass('theme-active');
    $('.container-themes li').eq(themeIndex).addClass('theme-active');
  });

});
define("themeMenuUIUpdater", function(){});

/**
 * app.js
 *
 * Main entry point for requireJS. 
 * Configure paths for common libs/utils,
 * to allow shorthand dependency references
 * (eg 'tinyPubSub' instead of 'libs/tinyPubSub')
 *
 * Third party dependencies (jQuery) go in libs/
 */
require.config({
  paths: {
    jquery: 'https://code.jquery.com/jquery-2.1.4.min',
    microtemplate: 'libs/microtemplate',
    tinyPubSub: 'libs/tinyPubSub',
    constants: 'utils/constants',
    jsonp: 'utils/JSONPUtil'
  }
});

// Modules to load go here
require([
  'jsonp',
  'numResultsUIUpdater',
  'searchActions',
  'searchInputUIUpdater',
  'searchResultsUIUpdater',
  'searchService',
  'themeActions',
  'themeMenuUIUpdater'
]);
define("app", function(){});

