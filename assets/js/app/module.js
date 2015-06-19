(function fileUpload(angular){
  //ToDO: Angular application should work like a directive, to allow us use it several times on the same page.
  'use strict';

  var app = angular.module('FileUploader', ['ngFileUpload']);
  app.controller('fileController', ['$scope', function($scope){
    }])
    .directive('imgUpload', ['Upload', function(Upload){
      return{
        scope: {
          ngModel: "=",
          name: "=",
          cover:"&"
          //attachments:"=bind"
        },
        templateUrl: function(elem, attr) {
          console.log(attr.template);
          return "/js/template/" + attr.template + "Upload.html";
        },
        link: function($scope, element, attr){
          $scope.attachments = [];
          //$scope.cover = '';
          $scope.$watch('files', function(){
            $scope.upload($scope.files);
          });

          //$scope.$watchCollection('attachments', function (){
          //  console.log($scope.attachments);
          //  var s = $scope.attachments.join(',');
          //  //for (var i in $scope.cover){
          //  //  s += $scope.cover[i].id+',';
          //  //}
          //  //$scope.attachments = s;
          //  console.log($scope.attachments);
          //})


          $scope.upload = function(files){
            if(files && files.length){
              for(var i=0; i< files.length; i++){
                var file = files[i];
                //console.log(file, 'call upload at angular controller');
                Upload.upload({
                  url: '/attachment/upload',
                  fields: {
                    //'type': $scope.fileType
                  },
                  file: file
                }).progress(function(evt){
                  var progressPercentage = parseInt(100.0*evt.loaded/evt.total);
                  console.log('progress :' + progressPercentage + "%  " + evt.config.file.name)
                }).success(function (data, status, headers, config) {
                  if (data) {
                    switch(attr.template) {
                      case "img":
                        console.log("IMG - attr working!");
                        $scope.attachments.push(data.id);
                            break;
                      case "video":
                        console.log("VIDEO - attr working!");
                        $scope.attachments.push(data.id);
                            break;
                      case "cover":
                        console.log("COVER - attr working!");
                        $scope.cover = data.id;
                            break;
                      default:
                        console.log("NO ATTR specified!!!!");
                        $scope.attachments.push("ERR, NO ATTR specified!!!!");

                    //} elseif(attr.template == 'cover')
                    //{
                    //
                    //}
                    //elseif(attr.template == "video")
                    //{
                    //
                    }

                  };
                  //console.log("$scope.attachments = ", $scope.attachments);
                  //console.log("$scope.cover = ", $scope.cover);
                  //console.log('file ' + config.file.name + ' uploaded. Response: ', data);
                });
              }
            }
          }
        }
      }
    }])
})(window.angular);
