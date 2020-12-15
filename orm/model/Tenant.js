const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');

/**
 * @swagger
 * components:
 *  schemas:
 *      Tenant:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  readOnly: true
 *              firstname:
 *                  type: string
 *                  description: Prénom du locataire
 *              lastname:
 *                  type: string
 *                  description: Nom de famille du locataire
 *              register:
 *                  type: string
 *                  description: Registre nationnal
 *              address:
 *                  type: string
 *                  description: Adresse du locataire avant l'entrée dans les lieux
 *
 */

class Tenant extends Model {}
Tenant.init({
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    register: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{ 
    sequelize,
    modelName: 'tenant'
});

User.hasMany(Tenant);

module.exports = Tenant;