const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const moment = require('moment');

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
        allowNull: false,
        get() {
            return moment(this.getDataValue('date')).format('DD-MM-YYYY')
        },
        set(value) {
            this.setDataValue("date", moment(value, 'DD-MM-YYYY').format('MM-DD-YYYY')); 
        }
    }
},
{ 
    sequelize,
    modelName: 'rentowed',
    timestamps: false
});

module.exports = RentOwed