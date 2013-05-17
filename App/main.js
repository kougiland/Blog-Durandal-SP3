﻿/*global define, require, toastr */
require.config({
    paths: { "text": "durandal/amd/text" }
});

define(['durandal/app', 'durandal/viewLocator', 'durandal/system', 'durandal/plugins/router', 'services/logger'],
    function (app, viewLocator, system, router, logger) {

    // Enable debug message to show in the console 
    //>>excludeStart("build", true);
      system.debug(true);
      
      //  Setting L_Menu_BaseUrl for index.html
      window.L_Menu_BaseUrl = window.L_Menu_BaseUrl || '/demos/metro';

    //>>excludeEnd("build");

    app.start().then(function () {
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.backgroundpositionClass = 'toast-bottom-right';

        router.handleInvalidRoute = function (route, params) {
            logger.logError('No Route Found', route, 'main', true);
        };

        // When finding a viewmodel module, replace the viewmodel string 
        // with view to find it partner view.
        router.useConvention({views: '.'});
        viewLocator.useConvention();
        
        // Adapt to touch devices
        app.adaptToDevice();
        //Show the app by setting the root view model for our application.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});