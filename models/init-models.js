var DataTypes = require("sequelize").DataTypes;
var _all_data_per_page_fr = require("./all_data_per_page_fr");
var _blog_element_fr = require("./blog_element_fr");
var _business_data_fr = require("./business_data_fr");
var _category = require("./category");
var _demande_de_devis_gratuit_fr = require("./demande_de_devis_gratuit_fr");
var _extra_service_page_fr = require("./extra_service_page_fr");
var _faq_fr = require("./faq_fr");
var _footer_fr = require("./footer_fr");
var _index_content_fr = require("./index_content_fr");
var _main_service_data_fr = require("./main_service_data_fr");
var _nav_fr = require("./nav_fr");
var _portfolio_section_fr = require("./portfolio_section_fr");
var _review_data_fr = require("./review_data_fr");
var _welcome_section_fr = require("./welcome_section_fr");

function initModels(sequelize) {
  var all_data_per_page_fr = _all_data_per_page_fr(sequelize, DataTypes);
  var blog_element_fr = _blog_element_fr(sequelize, DataTypes);
  var business_data_fr = _business_data_fr(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var demande_de_devis_gratuit_fr = _demande_de_devis_gratuit_fr(sequelize, DataTypes);
  var extra_service_page_fr = _extra_service_page_fr(sequelize, DataTypes);
  var faq_fr = _faq_fr(sequelize, DataTypes);
  var footer_fr = _footer_fr(sequelize, DataTypes);
  var index_content_fr = _index_content_fr(sequelize, DataTypes);
  var main_service_data_fr = _main_service_data_fr(sequelize, DataTypes);
  var nav_fr = _nav_fr(sequelize, DataTypes);
  var portfolio_section_fr = _portfolio_section_fr(sequelize, DataTypes);
  var review_data_fr = _review_data_fr(sequelize, DataTypes);
  var welcome_section_fr = _welcome_section_fr(sequelize, DataTypes);

  blog_element_fr.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(blog_element_fr, { as: "blog_element_frs", foreignKey: "category_id"});

  return {
    all_data_per_page_fr,
    blog_element_fr,
    business_data_fr,
    category,
    demande_de_devis_gratuit_fr,
    extra_service_page_fr,
    faq_fr,
    footer_fr,
    index_content_fr,
    main_service_data_fr,
    nav_fr,
    portfolio_section_fr,
    review_data_fr,
    welcome_section_fr,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
