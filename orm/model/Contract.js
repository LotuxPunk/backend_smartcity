const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');
const Apartment = require('./Apartment');
const Payment = require('./Payment');
const RentOwed = require('./RentOwed');
const moment = require('moment');

class Contract extends Model {
    get balance() {
        const pattern = "DD-MM-YYYY";
        let balance = [];

        let addToBalance = (amount, date) => {
            balance.push({ date : date.format(), amount });
        }

        let sortFunction = (a, b) => {
            return moment(b.date, pattern).format('YYYYMMDD') - moment(a.date, pattern).format('YYYYMMDD')
        }

        for (const [i, rent] of this.rentoweds.entries()) {
            let currDate = moment(rent.date, pattern);

            if (i < this.rentoweds.length - 1) {
                while (moment(currDate).isBefore(moment(this.rentoweds[i+1].date))) {
                    addToBalance((parseFloat(rent.rent) + parseFloat(rent.charge)) * -1, currDate);
                    currDate.add(1, 'M');
                }
            }
            else {
                while (moment(currDate).isBefore(moment.now()) && moment(currDate).isBefore(this.date_end)){
                    addToBalance((parseFloat(rent.rent) + parseFloat(rent.charge)) * -1, currDate);
                    currDate.add(1, 'M');                    
                }
            }
        }

        for (const payment of this.payments) {
            let currDate = moment(payment.date, pattern);
            addToBalance(payment.amount, currDate);
        }

        return balance.sort(sortFunction);
    }
}
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
    }
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