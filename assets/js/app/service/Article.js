(function() {
  'use strict';

  angular.module('Article')
    .factory('Article', Article);
  Article.$inject = ['$resource'];
  function Article($resource) {
    return $resource('/article/:id', {id: '@id'});
  }
})();
