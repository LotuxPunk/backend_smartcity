const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const moment = require('moment');

/**
 * @swagger
 * components:
 *  schemas:
 *      Payment:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  readOnly: true
 *              amount:
 *                  type: number
 *                  format: double
 *                  description: Montant du paiement
 *              date:
 *                  type: string
 *                  format: date
 *                  description: Date du paiement
 *
 */

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