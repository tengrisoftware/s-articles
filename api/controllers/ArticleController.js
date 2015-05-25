/**
 * ArticleController
 *
 * @description :: Server-side logic for managing Articles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  //Show all Articles page.
  index: function(req, res){
    Article.find().exec(function allArticles(err, result){
      if(err) {
        return res.serverError(err);
      }
      if (!result) { //no articles found
        return res.notFound();
      }
      return res.view({  //return results to index.view
        articles: result
      });
    })
  },

  //Shows article page.
  view: function(req,res){
    var id = req.param('id');

    if (!id) {  //if no 'id' return error.
      return res.notFound();
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


  //Create new article action.
  createArticle: function(req,res) {
    var id = req.param('id');

    if (!id){
      return res.notFound();
    }

    Article.create(req.params.all()).exec(function articleCreated(err, result){
      if (err){
        return res.serverError();
      };
      if(!result){
        return res.notFound();
      }

      return res.view({
        article: result
      })

    });

    //var params = _.extend(req.query || {}, req.params.all || {}, req.body || {});
    //if((!params) || (params==null) || (_.keys(params).length==0)){
    //  return res.notFound();
    //} else {
    //  return res.json({
    //      textParams: req.params.all()
    //    });
    //}
  },

  //Edit existing article
  edit:function(req,res){
    var id = req.param('id');

    if (!id) {
      return res.view;
    } else {
      Article.findOne({id: req.param('id')})
        .exec(function (err, result) {
          if (err) {
            return res.serverError(err);
          }
          if (!result) {
            return res.notFound();
          }
          return res.view({
            article: result
          });
        });
    }
},

  //Update existing article action
  update: function(req, res){
    //var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    var id=params.id;
    //return res.json({
    //  textParams: req.params.all()
    //});
    if (!id) {
      return res.notFound();
    }

    Article.update(req.params.all()).exec(function userCreated(err, result) {
      if (err) {
        return res.serverError(err);
      }
      if (!result) {0
        return res.notFound();
      }
      return res.view({
        article: result
      })
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

