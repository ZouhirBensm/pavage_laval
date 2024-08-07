var DataTypes = require("sequelize").DataTypes;
var _Testing = require("./Testing");
var _blog_element = require("./blog_element");
var _business_data = require("./business_data");
var _category = require("./category");
var _review_data = require("./review_data");
var _service_data = require("./service_data");
var _service_page = require("./service_page");

function initModels(sequelize) {
  var Testing = _Testing(sequelize, DataTypes);
  var blog_element = _blog_element(sequelize, DataTypes);
  var business_data = _business_data(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var review_data = _review_data(sequelize, DataTypes);
  var service_data = _service_data(sequelize, DataTypes);
  var service_page = _service_page(sequelize, DataTypes);

  blog_element.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(blog_element, { as: "blog_elements", foreignKey: "category_id"});

  return {
    Testing,
    blog_element,
    business_data,
    category,
    review_data,
    service_data,
    service_page,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
