const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      items: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
