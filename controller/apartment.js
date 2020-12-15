const ApartmentORM = require("../orm/model/Apartment");

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