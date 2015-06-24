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
      // ищем все категории что бы для новой можно было выбрать родителя.
      Category.find().exec(function(err, result){
        if (err) {
          return res.serverError(err);
        }

        var current = _.groupBy(result, function (s) {return s.parent});
        var arrayNew = [];
        //console.log('current : ', current[''].length);

        current[''].forEach(function(elem){
          arrayNew.push(elem);
        });


        function cats(currentId, allCats) {
          var childs = [];
          var array = [];
          //console.log(allCats[currentId]);
          if (!allCats[currentId]) {
            return [];
          }

          array.push(allCats[currentId].forEach(function(elem, id, arr)
          {
            return cats(elem.id, allCats);
          }));

          return array;

          if(array) {
            childs.push(array);
          }
          console.log(childs);
          return childs;
        };

        var last = arrayNew.forEach(function(elem, i, arr) {
          //console.log('elem: ', elem, 'i: ', i, 'arr: ',arr);
          return cats(elem.id, current);
        })

        //console.log(last);

        //current.forEach (function (curr, i, current){
        //  console.log('curr ['+i+'] : ', curr );
        //}) ;
        //for (var i; i<current.length; i++) {
        //  console.log('current [' + i +'] : ', current[i]);
        //}

        //console.log('result after : ', current);

        return res.view({  //return results to index.view
          categoriesAll: result
        });
      })

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

