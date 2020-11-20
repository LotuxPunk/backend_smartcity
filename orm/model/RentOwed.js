const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Contract = require('./Contract');

class RentOwed extends Model {}
RentOwed.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
    },
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
    modelName: 'rentowed',
    timestamps: false
});

module.exports = RentOwed