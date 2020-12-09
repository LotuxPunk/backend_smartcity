const sequelize = require('./sequelize');
const User = require('./model/User');
const Tenant = require('./model/Tenant');
const Apartment = require('./model/Apartment');
const Payment = require('./model/Payment');
const RentOwed = require('./model/RentOwed');
const Contract = require('./model/Contract');

// let pu = User.sync({force : true})
// let pa = Apartment.sync({force : true})

// Promise.all([pu, pa]).then((values) => Contract.sync({force : true}));

sequelize
    .sync({force : true});



