const PaymentORM = require("../orm/model/Payment");

/**
 *@swagger
 *components:
 *  responses:
 *      PaiementCree:
 *          description: le paiement a été créé
 *  requestBodies:
 *      PaiementACreer:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Payment'
 */
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

/**
 *@swagger
 *components:
 *  responses:
 *      PaymentDeleted:
 *          description: le paiement a été supprimé
 */
module.exports.deletePayment = async (req, res) => {
    const id = parseInt(req.params.id);
    try{
        if(isNaN(id)){
            res.sendStatus(400)
        }
        else{
            
           await PaymentORM.destroy({
               where:{
                   id:id
               }
           });
           res.sendStatus(201);
        }
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}