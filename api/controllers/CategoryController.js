/**
 * CategoryController
 *
 * @description :: Server-side logic for managing Categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req,res){
   Category.find().exec( function (err, result) {
      if(err) {
        return res.serverError(err);
      }
      if (!result) { //no categories found
        return res.notFound();
      }
      return res.view({  //return results to index.view
        categories: result
      });
     })
  },

  create: function (req, res) {
    if( req.method.toUpperCase() == "POST") {
      var categoryNew = {
        name: req.param('name'),
        description: req.param('descrption'),
        parent: req.param('parentId')
      }

      console.log('CREATE.categoryNew : ' ,categoryNew);

      Category.create(categoryNew).exec( function( err, result ) {
        if (err) {
          return res.serverError(err);
        }
        return res.redirect('/category/index');
      })
    } else {
      return res.redirect('/category/edit');
    }

  },

  edit: function(req, res) {
    var id = req.param('id');

    if (!id){
      return res.view();
    }



  }
};

