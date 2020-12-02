const ownerRole = "owner"

module.exports.mustBeManager = (req, res, next) => {
    if(req.session !== undefined && req.session.authLevel === ownerRole){
        next();
    } else {
        res.sendStatus(403);
    }
}