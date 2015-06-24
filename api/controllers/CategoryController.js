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

        //выбираем все категории корневого уровня и заносим в массив
        current[''].forEach(function(elem){
          arrayNew.push(elem);
        });
        do { //запускаем цикл по массиву обьектов, что бы перебрать все группы.
          arrayNew.forEach(function(elem,i,current){ //берем первый рутовый елемент
            current[elem.id].forEach(elem)     // ищем всех его чаилдов, а точнее все елементы в которых он указан как папа и запускаем ещёё один цикл.
            {
              arrayNew[i].push(elem); //добавляем новый найденный элемент в текущую позицию.
            }
            delete current[elem.id];  // удаляем отработанный блок в обьекте.
          });
        } while (current);

        //по идеи у нас теперь есть новый массив обьектов под название arrayNew, в котором уже все отсортерованно как нужно.
sdf
        //console.log('current : ', current[''].length);

        function cats(currentId, allCats) {
          var childs = [];
          var array = [];
          console.log('allCats[currentId] = ', allCats[currentId], '\n\n')
          if (!allCats[currentId]) {
            return [];
          }
          array.push(allCats[currentId].forEach(function(elem, i, arr)
          {
            //console.log('iteration = ', i, '\n element_body = ', elem);
            return cats(elem.id, allCats);
          }));


          console.log('array = ', array);
          if(array) {
            childs.push(array);
          }
          console.log('childs = ', childs);
          return childs;
        };
        //console.log('\n \n \n basic arrayNew was: ', arrayNew);

        arrayNew.push(arrayNew.forEach(function(elem, i, arr) {
          //console.log('iteration = ', i, '\n element_body = ', elem);
          return cats(elem.id, current);
        }));

        console.log('\n \n ************************ \n \n resulted arrayNew = ', arrayNew);

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

