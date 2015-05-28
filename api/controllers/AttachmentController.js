/**
 * AttachmentController
 *
 * @description :: Server-side logic for managing Attachments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  upload: function(req, res) {

    req.file('files')
      .upload({
        dirname: '/uploads',
        maxBytes: 1000000,
        saveAs: function (_newFileStream,cb){
          cb(null, 'cover.jpg');
        }
      },function (err, uploadedFiles){
      if (err) {
        return res.serverError(err);
      }
      return res.json({  //типа получил я файлы и все ок. дальше вместо ретюрна нужно сказать ему куда их сложить.
        message: uploadedFiles.length + 'file(s) uploaded successfully',
        files: uploadedFiles
      })
    })
  }
};

