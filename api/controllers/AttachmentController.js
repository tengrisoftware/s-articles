/**
 * AttachmentController
 *
 * @description :: Server-side logic for managing Attachments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var mime = require('mime');

module.exports = {

  upload: function(req, res) {
    //console.log(req.file('files'));
    req.file('file')
      .upload({
        dirname: 'uploads',
        maxBytes: 1000000,
        saveAs: function (_newFileStream,cb){
          var high = 100000;
          var low  = 999999;
          cb(null, (Math.random() * (high - low) + low) + '.' + mime.extension(_newFileStream.headers['content-type']));
        }
      },function (err, uploadedFiles){
      if (err) {
        return res.serverError(err);
      }

      return res.json({
        message: uploadedFiles.length + ' file(s) uploaded successfully',
        files: uploadedFiles
      })
    })
  }
};

