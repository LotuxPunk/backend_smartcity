const ownerRole = "owner"

/**
 *@swagger
 * components:
 *  responses:
 *      mustBeOwner:
 *          description: L'action demandée ne peut être réalisée que par un propriétaire
 */
module.exports.mustBeOwner = (req, res, next) => {
    if(req.session !== undefined && req.session.authLevel === ownerRole){
        next();
    } else {
        res.sendStatus(403);
    }
}