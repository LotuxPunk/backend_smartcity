const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const moment = require('moment');

class RentOwed extends Model {}
RentOwed.init({
    rent: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    charge: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
{ 
    sequelize,
    modelName: 'rentowed',
    timestamps: false
});

module.exports = RentOwed