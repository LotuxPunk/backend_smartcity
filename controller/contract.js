const Apartment = require("../orm/model/Apartment");
const ContractORM = require("../orm/model/Contract");
const Payment = require("../orm/model/Payment");
const RentOwedORM = require("../orm/model/RentOwed");
const Tenant = require("../orm/model/Tenant");
const sequelize = require('../orm/sequelize');

/**
 *@swagger
 *components:
 *  responses:
 *      ContratCree:
 *          description: le contrat a été créé
 *  requestBodies:
 *      ContratACreer:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          waranty:
 *                              type: number
 *                              format: double
 *                              description: Montant de la garantie
 *                          cpas_waranty:
 *                              type: boolean
 *                              description: La garantie est fournie par le CPAS
 *                          date_start:
 *                              type: string
 *                              format: date
 *                              description: Date de début du contrat
 *                          date_end:
 *                              type: string
 *                              format: date
 *                              description: Date de fin du contrat
 *                          ref_contract:
 *                              type: string
 *                              nullable: true
 *                              description: Référence d'enregistrement d'un contrat
 *                          rent:
 *                              type: number
 *                              format: double
 *                              description: Montant du loyer
 *                          charge:
 *                              type: number
 *                              format: double
 *                              description: Montant des charges
 *                          apartmentId:
 *                              type: integer
 *                              description: ID de l'appartement
 *                          tenantId:
 *                              type: integer
 *                              description: ID du locataire
 */
module.exports.addContract = async (req, res) => {
    const body = req.body;
    const { date_start, date_end, waranty, cpas_waranty, ref_contract, apartmentId, tenantId, rent, charge } = body;

    if (date_start === undefined || date_end === undefined || waranty === undefined || cpas_waranty === undefined || ref_contract === undefined || apartmentId === undefined || tenantId === undefined) {
        res.sendStatus(400);
    }
    else{
        const t = await sequelize.transaction();
        
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
            }, { transaction : t });

            await RentOwedORM.create({
                rent,
                charge,
                date:date_start,
                contractId:contrat.id
            }, { transaction : t });

            await t.commit();

            res.sendStatus(201);
        }
        catch(error){
            console.error(error);
            await t.rollback();
            res.sendStatus(500);
        }
    }
}

/**
 * @swagger
 * components:
 *  schemas:
 *      Contract:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              waranty:
 *                  type: number
 *                  format: double
 *                  description: Montant de la garantie
 *              cpas_waranty:
 *                  type: boolean
 *                  description: La garantie est fournie par le CPAS
 *              date_start:
 *                  type: string
 *                  format: date
 *                  description: Date de début du contrat
 *              date_end:
 *                  type: string
 *                  format: date
 *                  description: Date de fin du contrat
 *              ref_contract:
 *                  type: string
 *                  nullable: true
 *                  description: Référence d'enregistrement d'un contrat
 *              tenant:
 *                  $ref: '#/components/schemas/Tenant'
 *              apartment:
 *                  $ref: '#/components/schemas/Apartment'
 *              payments:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Payment'
 *              rentoweds:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/RentOwed'
 *
 */

 /**
 * @swagger
 * components:
 *  responses:
 *      ContractFound:
 *           description: renvoie une contrat avec l'appartment, le locataire, les échéances et le solde locatif
 *           content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                          contract:
 *                              $ref: '#/components/schemas/Contract'
 *                          balance:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      amount:
 *                                          type: number
 *                                          format: double
 *                                      date:
 *                                          type: string
 *                                          format: date
 *                                      id:
 *                                          type: integer
 */

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
                    },
                    {
                        model:Tenant
                    },
                    {
                        model:Apartment
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

/**
 * @swagger
 * components:
 *  schemas:
 *      ContractItem:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              waranty:
 *                  type: number
 *                  format: double
 *                  description: Montant de la garantie
 *              cpas_waranty:
 *                  type: boolean
 *                  description: La garantie est fournie par le CPAS
 *              date_start:
 *                  type: string
 *                  format: date
 *                  description: Date de début du contrat
 *              date_end:
 *                  type: string
 *                  format: date
 *                  description: Date de fin du contrat
 *              ref_contract:
 *                  type: string
 *                  nullable: true
 *                  description: Référence d'enregistrement d'un contrat
 *              tenant:
 *                  $ref: '#/components/schemas/Tenant'
 *              apartment:
 *                  $ref: '#/components/schemas/Apartment'
 *
 */

/**
 * @swagger
 * components:
 *  responses:
 *      ContractsFound:
 *           description: renvoie une liste de contrats avec l'appartment et le locataire
 *           content:
 *               application/json:
 *                   schema:
 *                       type: array
 *                       items:
 *                          $ref: '#/components/schemas/ContractItem'
 */

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
                include: [
                    {
                        model:Tenant
                    },
                    {
                        model:Apartment
                    }
                ]
            });
           if (contracts !== null) {
               res.json(contracts);
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