const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');

class Tenant extends Model {}
Tenant.init({
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    register: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{ 
    sequelize,
    modelName: 'tenant'
});

User.hasMany(Tenant);

module.exports = Tenant;