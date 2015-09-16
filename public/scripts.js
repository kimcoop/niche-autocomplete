/**
 * tinyPubSub.js
 *
 * jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * http://benalman.com/
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL 
 */

var JSONPUtil={_oJsonpRequests:{},_iJsonpRequestCount:0,DispatchJsonpResponse:function(e,t){var n=this._oJsonpRequests[t];delete this._oJsonpRequests[t],n&&n(e)},LoadJSONP:function(e,t){var n=this._iJsonpRequestCount++;this._oJsonpRequests[n]=t;var r=document.createElement("script");r.setAttribute("src",e+"&callback=JSONPUtil.DispatchJsonpResponse"+"&echo="+n),document.body.appendChild(r)}};define("jsonp",function(){}),define("tinyPubSub",["jquery"],function(){var e=$({});$.subscribe=function(){e.on.apply(e,arguments)},$.unsubscribe=function(){e.off.apply(e,arguments)},$.publish=function(){e.trigger.apply(e,arguments)}}),define("watchdog",["jquery","tinyPubSub"],function(){"use strict";var e=["search:exitResult","search:exitResults","search:activateResult","search:selectResult","search:jsonLoadError","search:jsonLoadSuccess","search:new","theme:activate"],t=function(e){$.subscribe(e,function(t,n){console.groupCollapsed(e),console.log(n),console.groupEnd()})};for(var n=0,r=e.length;n<r;n++)t(e[n]);console.log("Watchdog watching!",e)}),define("constants",[],function(){"use strict";var e={URL_SEARCH_BASE:"http://niche-recruiting-autocomplete.appspot.com/search/?query=",ERROR_SEARCH_DEFAULT:"We're sorry, but something went wrong with your search. Please try again.",keyCodes:{ENTER:13,UP:38,DOWN:40,ESCAPE:27},getSearchUrlForTerm:function(t){return e.URL_SEARCH_BASE+t},getResultsTextForNum:function(e){var t=e===1?"result":"results";return e+" "+t}};return e}),require(["constants","tinyPubSub","jquery"],function(e){"use strict";$.subscribe("search:exitResults",function(e,t){$(".num-results").text("")}),$.subscribe("search:jsonLoadSuccess",function(t,n){$(".num-results").text(e.getResultsTextForNum(n.total))})}),define("numResultsUIUpdater",function(){}),require(["constants","jquery","tinyPubSub"],function(e){"use strict";var t=function(){var t=$(".input-search");t.val(""),t.keydown(function(t){if(t.keyCode===e.keyCodes.UP)return!1}),t.on("keyup",function(t){if(t.keyCode===e.keyCodes.ESCAPE)return $.publish("search:exitResults"),!1;var n=$(".list-results .result-active"),r=n.index();return t.keyCode===e.keyCodes.ENTER&&n.length?$.publish("search:selectResult",{index:r}):t.keyCode===e.keyCodes.DOWN?$.publish("search:activateResult",{index:n.next("li").length?r+1:0}):t.keyCode===e.keyCodes.UP?$.publish("search:activateResult",{index:n.prev("li").length?r-1:-1}):$.publish("search:new",{searchTerm:$(this).val().trim()}),!1})},n=function(){$(".list-results").on("mouseenter","li",function(){$.publish("search:activateResult",{index:$(this).index()})}).on("mouseleave","li",function(){$.publish("search:exitResult")}).on("click","li",function(e){$.publish("search:selectResult",{index:$(this).index()})})},r=function(){$(".link-search").click(function(e){e.preventDefault();var t=$(".list-results .result-active");t.length&&$.publish("search:selectResult",{index:t.index()})})},i=function(){$(".form-search").submit(function(e){e.preventDefault()})},s=function(){$(document).on("click",function(e){$(e.target).parents(".form-search").length||$.publish("search:exitResults")})};$(function(){t(),n(),r(),i(),s()})}),define("searchActions",function(){}),require(["tinyPubSub","jquery"],function(){"use strict";var e="",t=function(e){var t=e.index||0,n=$(".list-results li").eq(t).data("name");$(".input-search").val(n)};$.subscribe("search:selectResult",function(e,n){t(n)}),$.subscribe("search:activateResult",function(e,n){t(n)}),$.subscribe("search:exitResults",function(e,t){$(".input-search").val("")}),$.subscribe("search:new",function(t,n){e=n.searchTerm}),$.subscribe("search:exitResult",function(t,n){$(".input-search").val(e)})}),define("searchInputUIUpdater",function(){}),function(){var e={};this.tmpl=function t(n,r){var i=/\W/.test(n)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+n.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):e[n]=e[n]||t(document.getElementById(n).innerHTML);return r?i(r):i}}(),define("microtemplate",function(){}),require(["jquery","microtemplate","tinyPubSub"],function(){"use strict";$.subscribe("theme:activate",function(e,t){var n="theme-"+t.theme||"theme-0";$(".container-autocomplete").removeClass("theme-0 theme-1").addClass(n)}),$.subscribe("search:jsonLoadError",function(e,t){$(".error-search").text(t.message).removeClass("hidden")}),$.subscribe("search:jsonLoadSuccess",function(e,t){$(".error-search").addClass("hidden");var n=t.results.map(function(e){return tmpl("tmpl_searchResult",e)}).join("");$(".list-results").html(n),t.total===1&&$(".list-results li").first().addClass("result-active")}),$.subscribe("search:exitResults",function(e,t){$(".list-results").empty()}),$.subscribe("search:exitResult",function(e,t){$(".list-results .result-active").removeClass("result-active")}),$.subscribe("search:activateResult",function(e,t){$(".list-results .result-active").removeClass("result-active");var n=t.index||0;$(".list-results li").eq(n).addClass("result-active")}),$.subscribe("search:selectResult",function(e,t){var n=t.index||0;$(".list-results li").eq(n).addClass("result-selected").children("a")[0].click()})}),define("searchResultsUIUpdater",function(){}),require(["constants","jquery","tinyPubSub"],function(e){"use strict";var t=function(t){if(!t.length){$.publish("search:exitResults");return}var n=e.getSearchUrlForTerm(t);JSONPUtil.LoadJSONP(n,function(t){if(!t){$.publish("search:jsonLoadError",{message:e.ERROR_SEARCH_DEFAULT});return}$.publish("search:jsonLoadSuccess",t)})};$.subscribe("search:new",function(e,n){t(n.searchTerm)})}),define("searchService",function(){}),require(["jquery","tinyPubSub"],function(){"use strict";$(function(){$(".container-themes").delegate("li","click",function(e){e.preventDefault();var t=$(this).data("theme");$.publish("theme:activate",{theme:t})})})}),define("themeActions",function(){}),require(["jquery","tinyPubSub"],function(){"use strict";$.subscribe("theme:activate",function(e,t){var n=t.theme||0;$(".container-themes .theme-active").removeClass("theme-active"),$(".container-themes li").eq(n).addClass("theme-active")})}),define("themeMenuUIUpdater",function(){}),require.config({paths:{jquery:"https://code.jquery.com/jquery-2.1.4.min",microtemplate:"libs/microtemplate",tinyPubSub:"libs/tinyPubSub",constants:"utils/constants",jsonp:"utils/JSONPUtil",watchdog:"utils/watchdog"}}),require(["jsonp","watchdog","numResultsUIUpdater","searchActions","searchInputUIUpdater","searchResultsUIUpdater","searchService","themeActions","themeMenuUIUpdater"]),define("app",function(){});