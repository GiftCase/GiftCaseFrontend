// here we put the paths to all the libraries and framework we will use
require.config({
  paths: {
    jquery: '../lib/zepto/zepto', // ../lib/jquery/jquery', 
    underscore: '../lib/underscore/underscore',
    backbone: "../lib/backbone/backbone",
    text: '../lib/require/text',
    async: '../lib/require/async',
    handlebars: '../lib/handlebars/handlebars',
    templates: '../templates',
    leaflet: '../lib/leaflet/leaflet',
    spin: '../lib/spin/spin.min',
    preloader: '../lib/preloader/pre-loader',
    utils: '../lib/utils/utils',
    urlhelper: '../js/helpers/URLHelper',
    collectiontests: '../js/tests/CollectionTests',
    appdata: '../js/appdata',
    facebook: ''
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'leaflet': {
      exports: 'L'
    }
  }
});

// We launch the App
 require(['backbone', 'utils', 'preloader', 'router', 'appdata', 'collectiontests'], 
  function(Backbone, Utils, PreLoader, AppRouter, AppData, CollectionTests) {
        
    document.addEventListener("deviceready",

    function() {
      //CollectionTests.inboxTest();
       
      var appDataPar = new AppData();      

      // Here we precompile ALL the templates so that the app will be quickier when switching views
      // see utils.js
      var router;
      Utils.loadTemplates().once("templatesLoaded", function() {

      var images = []; // here the developer can add the paths to the images that he would like to be preloaded
      if (images.length) {
          new PreLoader(images, {
            onComplete: startRouter
          });
        } else {
          // start the router directly if there are no images to be preloaded
          startRouter();
        }
        
        function startRouter() {
          // launch the router
          var router = new AppRouter({
            appData : appDataPar
          });
          Backbone.history.start();
        }
      });

    }, false);
});