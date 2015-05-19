/**
 * ArticleController
 *
 * @description :: Server-side logic for managing Articles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  view: function(req,res){
    var id = req.param('id');

    if (!id) {
      return res.redirect('/');
    }

    Article.findOne({id: req.param('id')})
      .sort('createdAt DESC')
      .limit(10)
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
  //New article adding controller
  add: function(req,res){
    if (req.method.toUpperCase()=='POST') {
      Article.create(req.params.all()).exec(function articleCreation(err, result){
        if (err) {
          return res.serverError(err);
        }
        if (!result) {
          return res.notFound();
        }
        console.log(result);
        return res.redirectTo("/");
      });
    } else {
      return res.serverError(404, 'POST - expected.');
    }
    return res.ok();
  }
};

