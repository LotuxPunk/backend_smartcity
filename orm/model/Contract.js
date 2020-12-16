const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');
const Apartment = require('./Apartment');
const Payment = require('./Payment');
const RentOwed = require('./RentOwed');
const moment = require('moment');
const Tenant = require('./Tenant');

/**
 * @swagger
 * components:
 *  schemas:
 *      ContractModel:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  readOnly: true
 *              waranty:
 *                  type: number
 *                  format: double
 *                  description: Montant de la garantie
 *              cpas_waranty:
 *                  type: boolean
 *                  description: La garantie est fournie par le CPAS
 *              date_start:
 *                  type: string
 *                  format: date
 *                  description: Date de début du contrat
 *              date_end:
 *                  type: string
 *                  format: date
 *                  description: Date de fin du contrat
 *              ref_contract:
 *                  type: string
 *                  nullable: true
 *                  description: Référence d'enregistrement d'un contrat
 *              tenantId:
 *                  type: integer
 *              apartmentId:
 *                  type: integer
 *
 */

class Contract extends Model {
    get balance() {
        const pattern = "YYYY-MM-DD";
        let balance = [];

        let addToBalance = (amount, date, id = 0) => {
            balance.push({ date : date.format(pattern), amount, id });
        }

        let sortFunction = (a, b) => {
            return moment(b.date, pattern).valueOf() - moment(a.date, pattern).valueOf();
        }

        for (const [i, rent] of this.rentoweds.entries()) {
            let currDate = moment(rent.date, pattern);
            const dateEnd = moment(this.date_end, pattern);

            if (i < this.rentoweds.length - 1) {
                while (currDate.isBefore(moment(this.rentoweds[i+1].date))) {
                    addToBalance((parseFloat(rent.rent) + parseFloat(rent.charge)) * -1, currDate);
                    currDate.add(1, 'M');
                }
            }
            else {
                while (currDate.isBefore(moment.now()) && currDate.isBefore(dateEnd)){
                    addToBalance((parseFloat(rent.rent) + parseFloat(rent.charge)) * -1, currDate);
                    currDate.add(1, 'M');                    
                }
            }
        }

        for (const payment of this.payments) {
            let currDate = moment(payment.date, pattern);
            addToBalance(payment.amount, currDate, payment.id);
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
Contract.belongsTo(Apartment);

User.hasMany(Contract, {
    foreignKey: {
        allowNull:false
    }
});

Tenant.hasMany(Contract, {
    foreignKey:{
        allowNull:false
    }
});
Contract.belongsTo(Tenant);

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