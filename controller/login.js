const UserORM = require("../orm/model/User")
const {compareHash} = require("../utils/utils");
const jwt = require('jsonwebtoken');
const process = require('process');

module.exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    console.debug("test");
    if(email === undefined && password == undefined){
        res.sendStatus(400);
    }
    else {
        try {
            const user = await UserORM.findOne({where: {email:email}})
            if (user === null) {
                res.sendStatus(404);
            } else if(await compareHash(password, user.password)){
                const {id, firstname, lastname} = user;
                const payload = {value: {id, firstname, lastname}};
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '1d'}
                );
                res.json(token);
            }
        }
        catch(err){
            console.error(err);
            res.sendStatus(500);
        }
    }
};