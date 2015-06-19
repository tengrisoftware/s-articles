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
      .populate('cover')
      .exec(function(err, result) {
        if(err) {
          return res.serverError(err);
        }
        if (!result) {
          return res.notFound();
        }
        //console.log(result);
        //console.log(result.source);
        return res.view({
          article: result
        });
      });
  },

  //Create new article action.
  create: function(req, res) {

    console.log('request : ', req.body);

    if( req.method.toUpperCase() == "POST") {
      var art = {
        title : req.param('title'),
        content : req.param('content'),
        preview : req.param('preview'),
        cover : req.param('cover'),
        attachments : req.param('attachments'),
      };

      console.log('art : ', art);

      Article.create(art).exec(function(err, result){
        if (err){
          return res.serverError(err);
        };
        console.log('result : ', result);

        if(!result){
          return res.notFound();
        }
        return res.redirect('/article/view/'+result.id)
      });
    } else {
      return res.redirect('/article/edit');
    }
  },

  //Edit existing article
  edit:function(req,res){
    var id = req.param('id');
    if (!id) {
      return res.view();
    }
    Article.findOne({id: req.param('id')})
      .populate('cover')
      .exec(function (err, result) {
        if (err) {
          return res.serverError(err);
        }
        if (!result) {
          return res.notFound();
        }
        //console.log(req.params.all());

        if (req.method.toUpperCase() == "POST") {
          result.title = req.param('title');
          result.content = req.param('content');
          result.preview = req.param('preview');
          result.cover = req.param('cover');
          result.attachments = req.param('attachments');

         console.log(" result: = ", result);
         //console.log(" result.cover: = ", result.cover);
         //return res.ok;

          result.save(function saveArticle(err) {
            if (err) {
              return res.serverError(err);
            }
            return res.redirect('/article/view/'+result.id)
          });
        } else {
          return res.view({
            article: result
          });
        }
      });
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
      //var backURL = req.header('Referer') || '/';
      //return res.redirect(backURL);
      return res.redirect('/article/index')
    })
  }
};

