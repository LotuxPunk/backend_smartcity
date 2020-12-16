const ApartmentORM = require("../orm/model/Apartment");
const Contract = require("../orm/model/Contract");

/**
 * @swagger
 * components:
 *  responses:
 *      ApartmentsFound:
 *           description: renvoie une liste d'appartement
 *           content:
 *               application/json:
 *                   schema:
 *                       type: array
 *                       items:
 *                          $ref: '#/components/schemas/Apartment'
 */
module.exports.getApartments = async (req, res) => {
    const id = parseInt(req.session.id);
    try{
        if(isNaN(id)){
            res.sendStatus(400)
        }
        else{
           const apartments = await ApartmentORM.findAll({where:{userId:id}});
           if (apartments !== null) {
                res.json(apartments);
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
 *      ApartmentItem:
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
 *              contract:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/ContractModel'
 *
 */

/**
 * @swagger
 * components:
 *  responses:
 *      ApartmentFound:
 *           description: renvoie une liste d'appartement
 *           content:
 *               application/json:
 *                   schema:
 *                       type: array
 *                       items:
 *                          $ref: '#/components/schemas/ApartmentItem'
 */

module.exports.getApartment = async (req, res) => {
    const id = parseInt(req.params.id);

    try{
        if(isNaN(id)){
            res.sendStatus(400)
        }
        else{
           const apartment = await ApartmentORM.findOne({where:{id:id}, include : {
               model: Contract,
           }});
           if (apartment !== null) {
                res.json(apartment);
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
 *@swagger
 *components:
 *  responses:
 *      AppartementCree:
 *          description: l'appartement a été créé
 *  requestBodies:
 *      AppartementACreer:
 *          content:
 *              multipart/form-data::
 *                  schema:
 *                      $ref: '#/components/schemas/Apartment'
 */
module.exports.addApartment = async (req, res) => {
    const body = req.body;
    const image = req.file
    const {name, city, address, postal_code} = body;
    const id = parseInt(req.session.id);
    

    if (name === undefined || city === undefined || address === undefined || postal_code === undefined || isNaN(id)){
        res.sendStatus(400);
    }
    else{
        try {
            await ApartmentORM.create({
                name,
                city,
                address,
                postal_code,
                image : image ? image.filename : null,
                userId : id
            });
            res.sendStatus(201);
        }
        catch(error){
            console.error(error);
            res.sendStatus(500);
        }
    }
}