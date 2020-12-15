const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const moment = require('moment');

/**
 * @swagger
 * components:
 *  schemas:
 *      RentOwed:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  readOnly: true
 *              rent:
 *                  type: number
 *                  format: double
 *                  description: Montant du loyer
 *              charge:
 *                  type: number
 *                  format: double
 *                  description: Montant des charges
 *              date:
 *                  type: string
 *                  format: date
 *                  description: Date de début du loyer dû
 *
 */

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