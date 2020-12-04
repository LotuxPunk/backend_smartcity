const ApartmentORM = require("../orm/model/Apartment");
const Contract = require("../orm/model/Contract");

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

module.exports.addApartment = async (req, res) => {
    const body = req.body;
    const {name, city, address, postal_code} = body;

    if (name === undefined || city === undefined || address === undefined || postal_code === undefined){
        res.sendStatus(400);
    }
    else{
        try {
            await ApartmentORM.create({
                name,
                city,
                address,
                postal_code
            });
            res.sendStatus(201);
        }
        catch(error){
            console.error(error);
            res.sendStatus(500);
        }
    }
}