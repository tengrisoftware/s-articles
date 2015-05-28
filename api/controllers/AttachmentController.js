/**
 * AttachmentController
 *
 * @description :: Server-side logic for managing Attachments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  //console.log(req.file("cover"));
  //req.file('cover')
  //  .upload({
  //    // Specify the directory for uploaded files
  //    dirname: 'uploads',
  //    // You can apply a file upload limit (in bytes)
  //    maxBytes: 1000000
  //
  //  }, function whenDone(err, uploadedFiles) {
  //    if (err) return res.serverError(err);
  //    else return res.json({
  //      files: uploadedFiles,
  //      textParams: req.params.all()
  //    });
  //  });
  upload: function(req, res) {
    //return res.json({
    //  message: req.param('file')
    //});

    console.log('enter');

    req.file('files').upload(function (err, uploadedFiles){
      if (err) {
        console.log('error');
        return res.serverError(err);
      }
      console.log('return');
      return res.json({
        message: uploadedFiles.length + 'file(s) uploaded successfully',
        files: uploadedFiles
      })
    })
  }
};

