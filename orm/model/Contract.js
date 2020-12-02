const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');
const Apartment = require('./Apartment');
const Payment = require('./Payment');
const RentOwed = require('./RentOwed');

class Contract extends Model {}
Contract.init({
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
},
{ 
    sequelize,
    modelName: 'contract',
    timestamps: false
});

Apartment.hasMany(Contract, {
    foreignKey: {
        name:"apartmentId",
        allowNull:false
    }
});

User.hasMany(Contract, {
    foreignKey: {
        name:"ownerId",
        allowNull:false
    }
});

User.hasOne(Contract, {
    foreignKey:{
        name:"tenantId",
        allowNull:false
    }
});

Contract.hasMany(RentOwed,{
    foreignKey:{
        allowNull:false
    }
});
Contract.hasMany(Payment,{
    foreignKey:{
        allowNull:false
    }
})

module.exports = Contract;