require.config({
  paths: {
    'jquery': 'https://code.jquery.com/jquery-2.1.4.min',
    'microtemplate': 'libs/microtemplate',
    'tinyPubSub': 'libs/tinyPubSub',
    'constants': 'utils/constants'
  }
});

require(['utils/JSONPUtil',
         'searchActions', 
         'searchInputUIUpdater',
         'searchResultsUIUpdater',
         'searchWidget',
         'themeActions',
         'themeMenuUIUpdater',
        ], function() {
  console.log('loaded');
});