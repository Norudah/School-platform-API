const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db");
const { Op } = require("sequelize");

class Relation extends Model {
  static async getRelationBetweenTwoUsers(userId1, userId2) {
    return await this.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: {
              fromId: userId1,
              toId: userId2,
            },
          },
          {
            [Op.and]: {
              fromId: userId2,
              toId: userId1,
            },
          },
        ],
      },
    });
  }

  static async getFriendRelationBetweenTwoUsers(userId1, userId2) {
    return await this.findOne({
      where: {
        status: "CONFIRMED",
        [Op.or]: [
          {
            [Op.and]: {
              fromId: userId1,
              toId: userId2,
            },
          },
          {
            [Op.and]: {
              fromId: userId2,
              toId: userId1,
            },
          },
        ],
      },
    });
  }
}

Relation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      field: "id",
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["PENDING", "CONFIRMED"],
      defaultValue: "PENDING",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "relation",
  }
);

module.exports = Relation;
