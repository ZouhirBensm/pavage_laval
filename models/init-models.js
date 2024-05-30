var DataTypes = require("sequelize").DataTypes;
var _Testing = require("./Testing");

function initModels(sequelize) {
  var Testing = _Testing(sequelize, DataTypes);


  return {
    Testing,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
