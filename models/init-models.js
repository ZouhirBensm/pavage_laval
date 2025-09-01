var DataTypes = require("sequelize").DataTypes;
var _about_page_en = require("./about_page_en");
var _about_page_fr = require("./about_page_fr");
var _all_data_per_page_en = require("./all_data_per_page_en");
var _all_data_per_page_fr = require("./all_data_per_page_fr");
var _areas_section_en = require("./areas_section_en");
var _areas_section_fr = require("./areas_section_fr");
var _blog_element_en = require("./blog_element_en");
var _blog_element_fr = require("./blog_element_fr");
var _blog_page_en = require("./blog_page_en");
var _blog_page_fr = require("./blog_page_fr");
var _blog_posting_content_en = require("./blog_posting_content_en");
var _blog_posting_content_fr = require("./blog_posting_content_fr");
var _business_data_en = require("./business_data_en");
var _business_data_fr = require("./business_data_fr");
var _category_en = require("./category_en");
var _category_fr = require("./category_fr");
var _category_page_en = require("./category_page_en");
var _category_page_fr = require("./category_page_fr");
var _demande_de_devis_gratuit_en = require("./demande_de_devis_gratuit_en");
var _demande_de_devis_gratuit_fr = require("./demande_de_devis_gratuit_fr");
var _extra_service_content_en = require("./extra_service_content_en");
var _extra_service_content_fr = require("./extra_service_content_fr");
var _extra_service_page_en = require("./extra_service_page_en");
var _extra_service_page_fr = require("./extra_service_page_fr");
var _faq_content_en = require("./faq_content_en");
var _faq_content_fr = require("./faq_content_fr");
var _faq_en = require("./faq_en");
var _faq_fr = require("./faq_fr");
var _footer_en = require("./footer_en");
var _footer_fr = require("./footer_fr");
var _hidden_section_en = require("./hidden_section_en");
var _hidden_section_fr = require("./hidden_section_fr");
var _index_content_en = require("./index_content_en");
var _index_content_fr = require("./index_content_fr");
var _legal_notice_page_en = require("./legal_notice_page_en");
var _legal_notice_page_fr = require("./legal_notice_page_fr");
var _main_service_data_en = require("./main_service_data_en");
var _main_service_data_fr = require("./main_service_data_fr");
var _nav_en = require("./nav_en");
var _nav_fr = require("./nav_fr");
var _organization_page_data_en = require("./organization_page_data_en");
var _organization_page_data_fr = require("./organization_page_data_fr");
var _plan_du_site_page_en = require("./plan_du_site_page_en");
var _plan_du_site_page_fr = require("./plan_du_site_page_fr");
var _portfolio_section_en = require("./portfolio_section_en");
var _portfolio_section_fr = require("./portfolio_section_fr");
var _privacy_policy_page_en = require("./privacy_policy_page_en");
var _privacy_policy_page_fr = require("./privacy_policy_page_fr");
var _review_data_en = require("./review_data_en");
var _review_data_fr = require("./review_data_fr");
var _welcome_section_en = require("./welcome_section_en");
var _welcome_section_fr = require("./welcome_section_fr");

function initModels(sequelize) {
  var about_page_en = _about_page_en(sequelize, DataTypes);
  var about_page_fr = _about_page_fr(sequelize, DataTypes);
  var all_data_per_page_en = _all_data_per_page_en(sequelize, DataTypes);
  var all_data_per_page_fr = _all_data_per_page_fr(sequelize, DataTypes);
  var areas_section_en = _areas_section_en(sequelize, DataTypes);
  var areas_section_fr = _areas_section_fr(sequelize, DataTypes);
  var blog_element_en = _blog_element_en(sequelize, DataTypes);
  var blog_element_fr = _blog_element_fr(sequelize, DataTypes);
  var blog_page_en = _blog_page_en(sequelize, DataTypes);
  var blog_page_fr = _blog_page_fr(sequelize, DataTypes);
  var blog_posting_content_en = _blog_posting_content_en(sequelize, DataTypes);
  var blog_posting_content_fr = _blog_posting_content_fr(sequelize, DataTypes);
  var business_data_en = _business_data_en(sequelize, DataTypes);
  var business_data_fr = _business_data_fr(sequelize, DataTypes);
  var category_en = _category_en(sequelize, DataTypes);
  var category_fr = _category_fr(sequelize, DataTypes);
  var category_page_en = _category_page_en(sequelize, DataTypes);
  var category_page_fr = _category_page_fr(sequelize, DataTypes);
  var demande_de_devis_gratuit_en = _demande_de_devis_gratuit_en(sequelize, DataTypes);
  var demande_de_devis_gratuit_fr = _demande_de_devis_gratuit_fr(sequelize, DataTypes);
  var extra_service_content_en = _extra_service_content_en(sequelize, DataTypes);
  var extra_service_content_fr = _extra_service_content_fr(sequelize, DataTypes);
  var extra_service_page_en = _extra_service_page_en(sequelize, DataTypes);
  var extra_service_page_fr = _extra_service_page_fr(sequelize, DataTypes);
  var faq_content_en = _faq_content_en(sequelize, DataTypes);
  var faq_content_fr = _faq_content_fr(sequelize, DataTypes);
  var faq_en = _faq_en(sequelize, DataTypes);
  var faq_fr = _faq_fr(sequelize, DataTypes);
  var footer_en = _footer_en(sequelize, DataTypes);
  var footer_fr = _footer_fr(sequelize, DataTypes);
  var hidden_section_en = _hidden_section_en(sequelize, DataTypes);
  var hidden_section_fr = _hidden_section_fr(sequelize, DataTypes);
  var index_content_en = _index_content_en(sequelize, DataTypes);
  var index_content_fr = _index_content_fr(sequelize, DataTypes);
  var legal_notice_page_en = _legal_notice_page_en(sequelize, DataTypes);
  var legal_notice_page_fr = _legal_notice_page_fr(sequelize, DataTypes);
  var main_service_data_en = _main_service_data_en(sequelize, DataTypes);
  var main_service_data_fr = _main_service_data_fr(sequelize, DataTypes);
  var nav_en = _nav_en(sequelize, DataTypes);
  var nav_fr = _nav_fr(sequelize, DataTypes);
  var organization_page_data_en = _organization_page_data_en(sequelize, DataTypes);
  var organization_page_data_fr = _organization_page_data_fr(sequelize, DataTypes);
  var plan_du_site_page_en = _plan_du_site_page_en(sequelize, DataTypes);
  var plan_du_site_page_fr = _plan_du_site_page_fr(sequelize, DataTypes);
  var portfolio_section_en = _portfolio_section_en(sequelize, DataTypes);
  var portfolio_section_fr = _portfolio_section_fr(sequelize, DataTypes);
  var privacy_policy_page_en = _privacy_policy_page_en(sequelize, DataTypes);
  var privacy_policy_page_fr = _privacy_policy_page_fr(sequelize, DataTypes);
  var review_data_en = _review_data_en(sequelize, DataTypes);
  var review_data_fr = _review_data_fr(sequelize, DataTypes);
  var welcome_section_en = _welcome_section_en(sequelize, DataTypes);
  var welcome_section_fr = _welcome_section_fr(sequelize, DataTypes);

  blog_element_en.belongsTo(category_en, { as: "category", foreignKey: "category_id"});
  category_en.hasMany(blog_element_en, { as: "blog_element_ens", foreignKey: "category_id"});
  blog_element_fr.belongsTo(category_fr, { as: "category", foreignKey: "category_id"});
  category_fr.hasMany(blog_element_fr, { as: "blog_element_frs", foreignKey: "category_id"});

  return {
    about_page_en,
    about_page_fr,
    all_data_per_page_en,
    all_data_per_page_fr,
    areas_section_en,
    areas_section_fr,
    blog_element_en,
    blog_element_fr,
    blog_page_en,
    blog_page_fr,
    blog_posting_content_en,
    blog_posting_content_fr,
    business_data_en,
    business_data_fr,
    category_en,
    category_fr,
    category_page_en,
    category_page_fr,
    demande_de_devis_gratuit_en,
    demande_de_devis_gratuit_fr,
    extra_service_content_en,
    extra_service_content_fr,
    extra_service_page_en,
    extra_service_page_fr,
    faq_content_en,
    faq_content_fr,
    faq_en,
    faq_fr,
    footer_en,
    footer_fr,
    hidden_section_en,
    hidden_section_fr,
    index_content_en,
    index_content_fr,
    legal_notice_page_en,
    legal_notice_page_fr,
    main_service_data_en,
    main_service_data_fr,
    nav_en,
    nav_fr,
    organization_page_data_en,
    organization_page_data_fr,
    plan_du_site_page_en,
    plan_du_site_page_fr,
    portfolio_section_en,
    portfolio_section_fr,
    privacy_policy_page_en,
    privacy_policy_page_fr,
    review_data_en,
    review_data_fr,
    welcome_section_en,
    welcome_section_fr,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
