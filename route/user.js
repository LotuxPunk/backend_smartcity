const UserController = require("../controller/user");
const Router = require("express-promise-router");
const { identification } = require("../middleware/Identification");
const router = new Router;

/**
 * @swagger
 * /user:
 *  post:
 *      tags:
 *          - User
 *      requestBody:
 *          $ref: '#/components/requestBodies/UserACreer'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/UserCree'
 *          400:
 *              description: Information(s) manquante(s)
 *          500:
 *              description: Erreur serveur
 *
 */
router.post("/", UserController.createUser);
/**
 * @swagger
 * /user/login:
 *  post:
 *      tags:
 *          - User
 *      description: renvoie un JWT token permettant l'identification
 *      requestBody:
 *          description: login pour la connexion
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *            description: un token JWT
 *            content:
 *                text/plain:
 *                    schema:
 *                        properties:
 *                           jwt:
 *                               type: string
 *                               description: Token JWT
 *          400:
 *              description: L'email et/ou le password ne sont pas correctement défini
 *          404:
 *              description: L'utilisateur n'a pas été trouvé avec les informations fournies
 *          500:
 *              description: Erreur serveur
 *
 */
router.post("/login", UserController.loginUser);
// router.get("/:id", identification, UserController.getUser);

module.exports = router;