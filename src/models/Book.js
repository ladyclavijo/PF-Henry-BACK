const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('book', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        photo: {
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
        
        publication_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        
        pages: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
        languageOfTheBook: {
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