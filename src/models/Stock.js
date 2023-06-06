const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "stock",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },

      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
