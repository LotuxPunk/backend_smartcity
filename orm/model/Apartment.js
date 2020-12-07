const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Apartment extends Model {}
Apartment.init({
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
    image:{
        type: DataTypes.STRING,
        allowNull: true
    }
},
{ 
    sequelize,
    modelName: 'apartment',
    timestamps: false
})

module.exports = Apartment;