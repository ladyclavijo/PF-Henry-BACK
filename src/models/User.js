const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      postalcode: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      phone: {
        type: DataTypes.BIGINT(15),
        allowNull: true,
        defaultValue: null,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      shippingAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      isBan: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
