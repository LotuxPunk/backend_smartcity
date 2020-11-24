const UserORM = require("../orm/model/User")
const {getHash, compareHash} = require("../utils/utils");
const jwt = require('jsonwebtoken');
const process = require('process');

module.exports.createUser = async (req, res) => {
    const body = req.body;
    const {email, password, firstname, lastname, register, address} = body;

    console.debug(body)

    if (email === undefined || password === undefined || firstname === undefined || lastname === undefined || register === undefined || address === undefined) {
        res.sendStatus(400)
    }
    else {
        const hashPassword = await getHash(password);
        try {
            await UserORM.create({
                firstname,
                lastname,
                register,
                address,
                email,
                password : hashPassword,
                role : 5
            });
            res.sendStatus(201);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
};

module.exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    if(email === undefined && password == undefined){
        res.sendStatus(400);
    }
    else {
        try {
            const user = await UserORM.findOne({where: {email:email}})
            if(user !== null && await compareHash(password, user.password)){
                const {id, firstname, lastname} = user;
                if (user.role <= 5) {
                    const payload = {status: "owner", value: {id, firstname, lastname}};
                    const token = jwt.sign(
                        payload,
                        process.env.SECRET_TOKEN,
                        {expiresIn: '1d'}
                    );
                    res.json(token);
                }
                else{
                    const payload = {status: "tenant", value: {id, firstname, lastname}};
                    const token = jwt.sign(
                        payload,
                        process.env.SECRET_TOKEN,
                        {expiresIn: '1d'}
                    );
                    res.json(token);
                }                
            }
            else{
                res.sendStatus(404);
            }
        }
        catch(err){
            console.error(err);
            res.sendStatus(500);
        }
    }
};