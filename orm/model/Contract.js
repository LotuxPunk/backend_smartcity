const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');
const Apartment = require('./Apartment');

class Contract extends Model {}
Contract.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
    },
    date_start: { 
        type: DataTypes.DATE,
        allowNull: false
    },
    date_end: {
        type: DataTypes.DATE,
        allowNull: true
    },
    waranty: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    cpas_waranty: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    ref_contract: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tenant: {
        type: DataTypes.INTEGER,
        allowNull: false,
     
        references: {
          model: User,
          key: 'id',
        }
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
     
        references: {
          model: User,
          key: 'id',
        }
    },
    apartment: {
        type: DataTypes.INTEGER,
        allowNull: false,
     
        references: {
          model: Apartment,
          key: 'id',
        }
    },
},
{ 
    sequelize,
    modelName: 'contract',
    timestamps: false
});

module.exports = Contract;