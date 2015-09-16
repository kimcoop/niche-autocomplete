/**
 * watchdog.js
 */

define(['jquery', 'tinyPubSub'], function() {
  'use strict';

  var events = [
    'search:exitResult',
    'search:exitResults',
    'search:activateResult',
    'search:selectResult',
    'search:jsonLoadError',
    'search:jsonLoadSuccess',
    'search:new',
    'theme:activate'
  ];

  var subscribe = function(eventName) {
    $.subscribe(eventName, function(event, data) {
      console.groupCollapsed(eventName);
      console.log(data);
      console.groupEnd();
    });
  };
  
  for (var i = 0, len = events.length; i < len; i++) {
    subscribe(events[i]);
  }

  console.log('Watchdog watching!', events);

});