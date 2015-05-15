(function(){
  'use strict';

  angular.module('Article')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'Article'];
  function HomeController($scope, Article) {

    $scope.articles = Article.query();
    $scope.article = "";

    $scope.sendPost = function(articleData) {
      console.log('first = '+articleData);
      var article   = new Article({title: articleData, content: "123123"});

      article.$save().then(function(newArticle) {
        $scope.articles.push(newArticle);
        console.log('save = '+newArticle);
      })
    }

  }
})()
