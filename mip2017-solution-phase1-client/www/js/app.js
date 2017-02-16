
angular.module('someklone.config', []).constant('appConfig', {
        "apiAddr": "http://localhost:8200/"
});

// Declare the services module
angular.module('someklone.services', ['someklone.config']);

// Declare the actual application module
angular.module('someklone', ['ionic', 'someklone.controllers', 'someklone.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})



.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {  

  $ionicConfigProvider.tabs.position("bottom");
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.browse', {
    url: '/browse',
      views: {
        'tab-browse': {
          templateUrl: 'templates/tab-browse.html',
          controller: 'BrowseCtrl'
      }
    }
  })

  .state('tab.browse-detail', {
    url: '/browse/:id',
      views: {
        'tab-browse': {
          templateUrl: 'templates/browse-detail.html',
          controller: 'BrowseDetailCtrl'
      }
    }
  })

  .state('tab.browse-search', {
    url: '/search',
      views: {
        'tab-browse': {
          templateUrl: 'templates/tab-search.html',
          controller: 'SearchCtrl'
      }
    }
  })  

  .state('tab.activity', {
    url: '/activity',
      views: {
        'tab-activity': {
          templateUrl: 'templates/tab-activity.html',
          controller: 'ActivityCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('post', {
    url: '/post',
    templateUrl: 'templates/post.html',
    controller: 'PostCtrl'    
  })

  .state('post-confirm', {
    url: '/confirm',
    templateUrl: 'templates/post-confirm.html',
    controller: 'PostConfirmCtrl',
    params: {
        imageUri: null
    }
  })
  
  .state('comment', {
    url: '/comment/:postId',
    templateUrl: 'templates/comment-post.html',
    controller: 'PostCommentCtrl'    
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'    
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

