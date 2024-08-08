var DataTypes = require("sequelize").DataTypes;
var _Testing = require("./Testing");
var _blog_element_fr = require("./blog_element_fr");
var _business_data_fr = require("./business_data_fr");
var _category = require("./category");
var _extra_service_page_fr = require("./extra_service_page_fr");
var _index_fr = require("./index_fr");
var _main_service_data_fr = require("./main_service_data_fr");
var _review_data_fr = require("./review_data_fr");

function initModels(sequelize) {
  var Testing = _Testing(sequelize, DataTypes);
  var blog_element_fr = _blog_element_fr(sequelize, DataTypes);
  var business_data_fr = _business_data_fr(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var extra_service_page_fr = _extra_service_page_fr(sequelize, DataTypes);
  var index_fr = _index_fr(sequelize, DataTypes);
  var main_service_data_fr = _main_service_data_fr(sequelize, DataTypes);
  var review_data_fr = _review_data_fr(sequelize, DataTypes);

  blog_element_fr.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(blog_element_fr, { as: "blog_element_frs", foreignKey: "category_id"});

  return {
    Testing,
    blog_element_fr,
    business_data_fr,
    category,
    extra_service_page_fr,
    index_fr,
    main_service_data_fr,
    review_data_fr,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
