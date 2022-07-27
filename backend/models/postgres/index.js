exports.sequelize = require("./db");
exports.User = require("./User");
exports.Relation = require("./Relation");

exports.User.belongsToMany(exports.User, { through: exports.Relation, as: "to", foreignKey: "toId" });
exports.User.belongsToMany(exports.User, { through: exports.Relation, as: "from", foreignKey: "fromId" });
