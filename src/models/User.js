const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },

      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },

      paymentMethod: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },

      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
