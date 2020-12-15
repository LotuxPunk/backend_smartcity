const TenantORM = require("../orm/model/Tenant");

/**
 *@swagger
 *components:
 *  responses:
 *      LocataireCree:
 *          description: le locataire a été créé
 *  requestBodies:
 *      LocataireACreer:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Tenant'
 */

module.exports.addTenant = async (req, res) => {
    const body = req.body;
    const { firstname, lastname, register, address} = body;

    if (firstname === undefined || lastname === undefined || register === undefined || address === undefined) {
        res.sendStatus(400);
    }
    else{
        try {

            TenantORM.create({
                firstname,
                lastname,
                register,
                address,
                userId : req.session.id
            });
            res.sendStatus(201);
        }
        catch(error){
            console.error(error);
            res.sendStatus(500);
        }
    }
}

/**
 * @swagger
 * components:
 *  responses:
 *      TenantsFound:
 *           description: renvoie une liste de locataire
 *           content:
 *               application/json:
 *                   schema:
 *                       type: array
 *                       items:
 *                          $ref: '#/components/schemas/Tenant'
 */
module.exports.getTenants = async (req, res) => {
    const id = parseInt(req.session.id);
    try{
        if(isNaN(id)){
            res.sendStatus(400)
        }
        else{
            let tenants = await TenantORM.findAll({
                where:
                    {userId:id}
            });
           if (tenants !== null) {
               res.json(tenants);
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

