var DataTypes = require("sequelize").DataTypes;
var _Testing = require("./Testing");
var _blog_element = require("./blog_element");
var _category = require("./category");
var _service_page = require("./service_page");

function initModels(sequelize) {
  var Testing = _Testing(sequelize, DataTypes);
  var blog_element = _blog_element(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var service_page = _service_page(sequelize, DataTypes);

  blog_element.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(blog_element, { as: "blog_elements", foreignKey: "category_id"});

  return {
    Testing,
    blog_element,
    category,
    service_page,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
