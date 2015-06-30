module.exports = {
  list: function list(array){

    //групперуем полученный массив по айдишнику парента
    var current = _.groupBy(array, function (s) {return s.parent});
    var arrayNew = []; //обьявляем новый массив, в который будем заносить результат

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
    return arrayNew;
  }
};

