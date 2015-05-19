/**
 * ArticleController
 *
 * @description :: Server-side logic for managing Articles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  //Shows article page.
  view: function(req,res){
    var id = req.param('id');

    if (!id) {
      return res.redirect('/');
    }

    Article.findOne({id: req.param('id')})
      .exec(function(err, result) {
        if(err) {
          return res.serverError(err);
        }
        if (!result) {
          return res.notFound();
        }
        return res.view({
          article: result
        });
      });
  },

  //New:Edit article form.
  edit: function(req,res) {
    var id = req.param('id');

    if(!id){
      return res.view()
    }

    Article.findOne({id: req.param('id')}).exec(function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      if (!result) {
        return res.notFound();
      }
      return res.view({
        article: result
      })
    })
  },

  //Save new article action
  save: function(req, res){
    Article.findOrCreate(req.params.all()).exec(function articleCreation(err, result) {
      if (err) {
        return res.serverError(err);
      }
      if (!result) {
        return res.notFound();
      }
      return res.redirect('/article/view/'+result.id)
    })
  },

  //Delete existing article
  del: function(req, res){
    var id = req.param('id');

    if(!id){
      // if id is empty then not_found error
      return res.notFound();
    }

    Article.destroy({id: req.param('id')}).exec(function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      if (!result) {
        return res.notFound();
      }
      return res.redirect('/')
    })
  }
};

