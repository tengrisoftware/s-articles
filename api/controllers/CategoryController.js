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

     //console.log('result before : ', result);

     //var decim = _.groupBy(result,result.parent);

     //console.log('result after : ', decim);

      return res.view({  //return results to index.view
        categories: result
      });
     })
  },

  create: function (req, res) {
    if( req.method.toUpperCase() == "POST") {
      var categoryNew = {
        name: req.param('name'),
        description: req.param('description'),
        parent: req.param('parentId'),
        active:true
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

    // нет категории на редактирование, создаем новую.
    if (!id){

      Category.find()
        .sort('name')
        .exec(function(err, result) {

          var categoryList = [];
          if (err) {
            return res.serverError(err);
          }
          categoryList = SortCategories.list(result);
          return res.view({  //return results to index.view
            categoriesAll: categoryList
          });
        });
    } else {
      Category.findOne({id: id})
        .exec(function (err, result){
          if (err) {
            return res.serverError(err);
          }

          if (req.method.toUpperCase() == "POST") {
            result.name =  req.param('name');
            result.description = req.param('description');
            result.parent = req.param('parentId');
            result.active = true;

            result.save(function saveCategory(err) {
              if (err) {
                return res.serverError(err);
              }
              return res.redirect('/category/index/')
            });
          } else {
            return res.view({  //return results to index.view
              categoryEdit: result
            });
          }
        })

      //return res.view();
    }
  },

  //Delete existing category
  del: function(req, res){
    var id = req.param('id');

    if(!id){
      // if id is empty then not_found error
      return res.notFound('No such category');
    }

    Category.destroy({id: req.param('id')}).exec(function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      if (!result) {
        return res.notFound();
      }
      return res.redirect('/category/index')
    })
  }

};

