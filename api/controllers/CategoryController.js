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
        //групперуем их по айдишнику парента
        var current = _.groupBy(result, function (s) {return s.parent});
        var arrayNew = []; //обьявляем новый массив, в который будем заносить результат


        //по идеи у нас теперь есть новый массив обьектов под название arrayNew, в котором уже все отсортерованно как нужно.

        //console.log('current : ', current[''].length);

        var cats = function(cat, raw) {
          if (cat.id in raw) {
            subCats(cat.id, cat.level, raw);
          }
        };

        var subCats = function(catId, level, raw) {
          for(c in raw[catId]) {
            var cat = raw[catId][c];
            cat.level = level + 1;
            arrayNew.push({id: cat.id, name: new Array(cat.level * 4 + 1).join('-') + "" + cat.name});
            cats(raw[catId][c], raw);
          }
        };

        subCats('', 0, current);

        console.log(current[''], arrayNew);

        //console.log('\n \n \n basic arrayNew was: ', arrayNew);

        return res.view({  //return results to index.view
          categoriesAll: arrayNew
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

