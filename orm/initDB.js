const sequelize = require('./sequelize');
const User = require('./model/User');
const Apartment = require('./model/Apartment');
const Contract = require('./model/Contract');
const Payment = require('./model/Payment');
const RentOwed = require('./model/RentOwed');

// let pu = User.sync({force : true})
// let pa = Apartment.sync({force : true})

// Promise.all([pu, pa]).then((values) => Contract.sync({force : true}));

sequelize.sync({force : true});



