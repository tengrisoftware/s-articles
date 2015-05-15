(function(){
  'use strict';

  angular.module('Article')
    .controller('HomeController'.HomeController);

  HomeController.$inject = ['$scope', 'Post'];
  function HomeController($scope, Post) {

    $scope.posts = Post.query();
    $scope.post = "";
    $scope.sendPost = function(post) {
      var article  = new Post({post: post});
      article.$save().then(function() {
        console.log(12312312312321);
      })
    }

  }
})()
