const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');

/**
 * @swagger
 * components:
 *  schemas:
 *      Apartment:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  readOnly: true
 *              name:
 *                  type: string
 *                  description: Nom de l'appartement
 *              city:
 *                  type: string
 *                  description: Ville
 *              address:
 *                  type: string
 *                  description: Adresse de l'appartement
 *              postal_code:
 *                  type: string
 *                  maxLength: 4
 *                  minLength: 4
 *                  description: Code postal
 *              image:
 *                  type: string
 *                  format: binary
 *                  nullable: true
 *                  description: Nom du fichier image
 *
 */

class Apartment extends Model {}
Apartment.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postal_code: {
        type: DataTypes.STRING(4),
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true
    }
},
{ 
    sequelize,
    modelName: 'apartment',
    timestamps: false
})

User.hasMany(Apartment);

module.exports = Apartment;