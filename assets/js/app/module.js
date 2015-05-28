(function fileUpload(){
  //ToDO: Files upload functional should be here, somebody please write it!!!
  'use strict';

  angular.module('FileUploader', [])
    .controler('imgController', ['$scope', 'Upload', function($scope, Upload){
          $scope.$watch('files', function(){
            $scope.upload($scope.files);
          });
      $scope.upload = function(files){
        if(files && files.length){
          for(var i=0; 1< files.length; i++){
            var files = files(i);
            Upload.upload({
                url: '',
                fields:'',
                file: file
            }).progress(function(evt){
              var progressPercent = parseint(100.0*evt.loaded/evt.total);
              console.log('progress :' + progressPercent + " %" + evt.config.file.name)
            }).success(function)

          }
        }
      }
        }
      ]
    )
    Upload.upload.progress.success

    .directive('imgUpload', function(){
      return{
        template: "<div>Image tage upload</div>"
        //templateUrl:"imgUpload.html"
      }
    })
    .directive('videoUpload', function(){
      return{
        templateUrl: 'videoUpload.html'
      }
    })

})()
