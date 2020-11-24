const UserORM = require("../orm/model/User")
const {getHash} = require("../utils/utils");

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
}