const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('book', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        cover: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        publisher: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        publisher_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        
        pages: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        language: {
            type: DataTypes.STRING,
            allowNull: false
        },

        stock: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        created: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
    timestamps: false
    })
}