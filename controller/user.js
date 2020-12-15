const UserORM = require("../orm/model/User")
const {getHash, compareHash} = require("../utils/utils");
const jwt = require('jsonwebtoken');
const process = require('process');

/**
 * @swagger
 *  components:
 *      responses:
 *          UserCree:
 *              description: l'utilisateur a été ajouté à la base de données
 *      requestBodies:
 *          UserACreer:
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              address:
 *                                  type: string
 *                              lastname:
 *                                  type: string
 *                              firstname:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              register:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                                  format: password
 *                          required:
 *                              - lastname
 *                              - firstname
 *                              - address
 *                              - password
 *                              - email
 *                              - register
 */
module.exports.createUser = async (req, res) => {
    const body = req.body;
    const {email, password, firstname, lastname, register, address} = body;

    if (email === undefined || password === undefined || firstname === undefined || lastname === undefined || register === undefined || address === undefined) {
        res.sendStatus(400);
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

/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *                  format: password
 *          required:
 *              - email
 *              - password
 */
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
                    res.json({jwt : token});
                }
                else{
                    const payload = {status: "tenant", value: {id, firstname, lastname}};
                    const token = jwt.sign(
                        payload,
                        process.env.SECRET_TOKEN,
                        {expiresIn: '1d'}
                    );
                    res.json({jwt : token});
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

// module.exports.getUser = async (req, res) => {
//     const id = parseInt(req.params.id);
//     try {
//         if (isNaN(id)) {
//             res.sendStatus(400);
//         }
//         else {
//             const user = await UserORM.findOne({where: {id:id}, attributes: ['id', 'firstname', 'lastname', 'email']});
//             if (user !== null) {
//                 res.json(user);
//             } else {
//                 res.sendStatus(404);
//             }
//         }
//     }
//     catch (error) {
//         console.error(error);
//         res.sendStatus(500);
//     }
// }