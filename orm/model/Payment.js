const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Payment extends Model {}
Payment.init({
    amount: {
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
    modelName: 'payment',
    timestamps: false
});

module.exports = Payment