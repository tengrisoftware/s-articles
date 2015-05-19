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
    if (!req.params.id == null) {
      Article.findOne({id: req.param('id')})
        .exec(function (err, result) {
          if (err) {
            return res.serverError(err);
          }
          if (!result) {
            return res.notFound();
          }
          return res.edit({
            article: result
          })
        })
    }
    return res.view();
  },

  //Save new article action
  save: function(req, res){
    Article.create(req.params.all()).exec(function articleCreation(err, result) {
      if (err) {
        return res.serverError(err);
      }
      if (!result) {
        return res.notFound();
      }
      return res.redirect('/article/view/'+result.id)
    })
  }
};

