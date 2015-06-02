(function fileUpload(angular){
  //ToDO: Files upload functional should be here, somebody please write it!!!
  'use strict';

  console.log('FileUpload function - enter');
  var app = angular.module('FileUploader', ['ngFileUpload']);
  app.controller('fileController', ['$scope', 'Upload', function($scope, Upload){
      console.log('scope watch - enter');
      $scope.$watch('files', function(){
        $scope.upload($scope.files);
        console.log('call scope.upload 1111');
      });

      $scope.upload = function(files){
        if(files && files.length){
          for(var i=0; i< files.length; i++){
            var file = files[i];
            console.log(file, 'call upload at angular controller');
            Upload.upload({
                url: '/attachment/upload',
                fields: {
                  'type': $scope.fileType
                },
                file: file
            }).progress(function(evt){
              var progressPercentage = parseInt(100.0*evt.loaded/evt.total);
              console.log('progress :' + progressPercentage + "%  " + evt.config.file.name)
            }).success(function (data, status, headers, config) {
              console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
            });
          }
        }
      }
        }
      ]
    )
    //.directive('imgUpload', function(){
    //  return{
    //    template: "<div>Image tage upload</div>"
    //    //templateUrl:"imgUpload.html"
    //  }
    //})
    //.directive('videoUpload', function(){
    //  return{
    //    templateUrl: 'videoUpload.html'
    //  }
    //})

})(window.angular);
