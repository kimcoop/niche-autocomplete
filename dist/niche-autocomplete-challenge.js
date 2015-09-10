/**
 * autoCompleteActions.js
 */

 require(['', '', ''], function($, Constants) {
  'use strict';

    $(function() {

      $('.input-search').val(''); // Always clear on start

      $('.form-search').submit(function(e) {
        e.preventDefault(); // Enter keypress should not submit form
      });
      
      $(document).on('blur', '.form-search', function(e) {
        if (!$(event.relatedTarget).parent('li').length) {
          $.publish('search:exitResults');
        }
      });

      $('.input-search').keydown(function(e) {
        // Prevent wandering cursor
        if (e.keyCode === Constants.keyCodes.UP) {
            return false;
        }
        return true;
      });

      $('.list-results').on('mouseenter', 'li', function() {
        $.publish('search:navigateResult', { index: $(this).index() });
      }).on('mouseleave', 'li', function() {
        // TODO
        $('.input-search').val('');
        $('.list-results .result-active').removeClass('result-active');
      });

      $('.input-search').on('keyup', function(e) {

        if (e.keyCode === Constants.keyCodes.ESCAPE) {
          $.publish('search:exitResults');
          return false;
        }

        if (e.keyCode === Constants.keyCodes.ENTER && $('.list-results .result-active').length) {
          $.publish('search:selectResult', { index: $('.list-results .result-active').index() });
          return false;
        }

        if (e.keyCode === Constants.keyCodes.DOWN) {
          if ($('.list-results .result-active').next('li').length) {
            $.publish('search:navigateResult', { index: $('.list-results .result-active').index() + 1 });
          } else { // Wrap or activate first item, same effect
            $.publish('search:navigateResult', { index: 0 });
          }
          return false;
        }

        if (e.keyCode === Constants.keyCodes.UP) {
          if ($('.list-results .result-active').prev('li').length) {
            $.publish('search:navigateResult', { index: $('.list-results .result-active').index() - 1 });
          } else { // Wrap or activate last item, same effect
            $.publish('search:navigateResult', { index: -1 });
          }
          return false;
        }
        
        SearchWidget.fetch( $(this).val().trim() );
        return false;
      });

    });

});;/**
 * searchInputUIUpdater.js
 */

(function($) {
  'use strict';

  var populateInput = function(data) {
    var index = data.index || 0; // default to first item
    var selectionName = $('.list-results li').eq(index).data('name');
    $('.input-search').val(selectionName);
  };

  $.subscribe('search:selectResult', function(event, data) {
    populateInput(data);
  });

  $.subscribe('search:navigateResult', function(event, data) {
    populateInput(data);
  });

  $.subscribe('search:exitResults', function(event, data) {
    $('.input-search').val('');
  });

})(jQuery);;/**
 * searchResultsUIUpdater.js
 */

(function($) {
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
  
  $.subscribe('search:navigateResult', function(event, data) {
    $('.list-results .result-active').removeClass('result-active'); // For good measure

    var index = data.index || 0;
    $('.list-results li').eq(index).addClass('result-active');
  });

  $.subscribe('search:selectResult', function(event, data) {
    var index = data.index || 0;
    $('.list-results li').eq(index)
      .addClass('selected')
      .children('a')[0].click();
  });

})(jQuery);;/**
 * searchWidget.js
 */

(function($, Constants) {
  'use strict';

  function SearchWidget() {}

  SearchWidget.prototype.fetch = function(searchTerm) {

    // If blank search, render no results
    if (!searchTerm.length) {
      $.publish('search:exitResults');
    }

    var searchUrl = Constants.getSearchUrlForTerm(searchTerm);
      
    JSONPUtil.LoadJSONP(searchUrl, function(response) {
      // If we don't get a response, something went wrong,
      // so just let the user know there's an error
      if (!response) {
        $.publish('search:jsonLoadError', { message: Constants.SEARCH_ERROR_MSG_DEFAULT });
        return;
      }

      $.publish('search:jsonLoadSuccess', response);
    });
  };

  window.SearchWidget = window.SearchWidget || new SearchWidget();

})(jQuery, Constants);;/**
 * themeActions.js
 */

(function($) {
  'use strict';

    $(function() {
      $('.container-themes').delegate('li', 'click', function(e) {
        e.preventDefault();
        var theme = $(this).data('theme');

        $.publish('theme:activate', { theme: theme });
      });
    });
    
})(jQuery);;/**
 * themeMenuUIUpdater.js
 */

(function($) {
  'use strict';

  $(function() {

    $.subscribe('theme:activate', function(event, data) {
      var themeIndex = data.theme || 0;
      $('.container-themes .theme-active').removeClass('theme-active');
      $('.container-themes li').eq(themeIndex).addClass('theme-active');
    });
  });

})(jQuery);