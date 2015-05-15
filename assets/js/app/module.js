(function(){
  'use strict';

  angular.module('Article', [
    'ngRoute',
    'ngResource'
  ]).config(ArticleConfig);

  ArticleConfig.$inject = ['$routeProvider']

  function ArticleConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'view/home.html',
        controller: 'HomeController'
      })
      .otherwise({
        redirectTo: '/'
      });

  };
})()
