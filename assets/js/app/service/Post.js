(function() {
  'use strict';

  angular.module('Article')
    .factory('Post', Post);
  Post.$inject = ['$resource'];
  function Post($resource) {
    return $resource('/post/:id', {id: '@id'});
  };
})();
