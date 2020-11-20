const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Contract = require('./Contract');

class Payment extends Model {}
Payment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    contract: {
        type: DataTypes.INTEGER,
        allowNull: false,
     
        references: {
          model: Contract,
          key: 'id',
        }
    }
},
{ 
    sequelize,
    modelName: 'payment',
    timestamps: false
});

module.exports = Payment