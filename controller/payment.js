const PaymentORM = require("../orm/model/Payment");

module.exports.addPayment = async (req, res) => {
    const body = req.body;
    const {amount, date, contractId} = body;

    if (amount === undefined || date === undefined || contractId === undefined) {
        res.sendStatus(400);
    }
    else {
        try {
            await PaymentORM.create({
                amount,
                date,
                contractId
            });

            res.sendStatus(201);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
}