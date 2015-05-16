/**
 * HomepageController
 *
 * @description :: Server-side logic for managing Homepages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  view: function (req, res) {
    Article.find().limit(10).exec(function (err, result) {
      if (err) return res.serverError(err);
      return res.view('homepage', {
        articles: result
      });
      //return res.view('homepage');
    });
  }
};

