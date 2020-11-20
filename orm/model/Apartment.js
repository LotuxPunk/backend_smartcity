const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Apartment extends Model {}
Apartment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postal_code: {
        type: DataTypes.STRING(4),
        allowNull: false
    },
},
{ 
    sequelize,
    modelName: 'apartment',
    timestamps: false
})

module.exports = Apartment;