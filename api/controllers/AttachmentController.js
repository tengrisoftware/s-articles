/**
 * AttachmentController
 *
 * @description :: Server-side logic for managing Attachments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var mime = require('mime');
var dateFormat = require('dateformat');

module.exports = {

  upload: function(req, res) {
    var dirName = sails.config.appPath+ '/assets/uploads/'   + dateFormat(new Date(), 'yyyy/mm/dd');

    req.file('file')
      .upload({
        dirname: dirName,
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
        if(!uploadedFiles.length) {
          console.log("Empty Uploaded Files list!");
          return res.serverError("Empty Uploaded Files list!");

        }
        //console.log(uploadedFiles);
        var attach = {};
          attach.name = uploadedFiles[0].filename;
          attach.source = uploadedFiles[0].fd;
          attach.type = uploadedFiles[0].type;
          attach.thumb = '';

        //console.log(attachment);
        Attachment.create(attach).exec(function (err, result) {
          if (err) {
            return res.serverError(err);
          }
          return res.json({
            id: result.id
          })
        })
      })
      //return res.json({
      //  message: uploadedFiles.length + ' file(s) uploaded successfully',
      //  files: uploadedFiles
      //})
  }
};

