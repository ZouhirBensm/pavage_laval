var DataTypes = require("sequelize").DataTypes;
var _Testing = require("./Testing");
var _blog_element = require("./blog_element");
var _service_page = require("./service_page");

function initModels(sequelize) {
  var Testing = _Testing(sequelize, DataTypes);
  var blog_element = _blog_element(sequelize, DataTypes);
  var service_page = _service_page(sequelize, DataTypes);


  return {
    Testing,
    blog_element,
    service_page,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
