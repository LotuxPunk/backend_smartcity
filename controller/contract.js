const ContractORM = require("../orm/model/Contract");
const Payment = require("../orm/model/Payment");
const RentOwedORM = require("../orm/model/RentOwed");
const Tenant = require("../orm/model/Tenant");
const User = require("../orm/model/User");

module.exports.addContract = async (req, res) => {
    const body = req.body;
    const { date_start, date_end, waranty, cpas_waranty, ref_contract, apartmentId, tenantId, rent, charge } = body;

    if (date_start === undefined || date_end === undefined || waranty === undefined || cpas_waranty === undefined || ref_contract === undefined || apartmentId === undefined || tenantId === undefined) {
        res.sendStatus(400);
    }
    else{
        try {

            //TODO Use transaction
            const userId = req.session.id;
            let contrat = await ContractORM.create({
                date_start,
                date_end,
                waranty,
                cpas_waranty,
                ref_contract,
                apartmentId,
                userId,
                tenantId
            });

            await RentOwedORM.create({
                rent,
                charge,
                date:date_start,
                contractId:contrat.id
            })
            res.sendStatus(201);
        }
        catch(error){
            console.error(error);
            res.sendStatus(500);
        }
    }
}

module.exports.getContract = async (req, res) => {
    const id = parseInt(req.params.id);
    try{
        if(isNaN(id)){
            res.sendStatus(400)
        }
        else{
            let contract = await ContractORM.findOne({
                where:
                    {id:id},
                include : [
                    {
                        model: RentOwedORM
                    },
                    {
                        model: Payment
                    }
                ]
            });
           if (contract !== null) {
               res.json({contract, balance : contract.balance});
            }
            else {
                res.sendStatus(404);
            }
        }
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

module.exports.getContracts = async (req, res) => {
    const id = parseInt(req.session.id);

    try{
        if(isNaN(id)){
            res.sendStatus(400)
        }
        else{
            let contracts = await ContractORM.findAll({
                where:
                    {userId:id},
                    include : [
                        {
                            model: User
                        },
                        {
                            model: Tenant
                        }
                    ]
            });
           if (contracts !== null) {
               res.json({contracts});
            }
            else {
                res.sendStatus(404);
            }
        }
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}