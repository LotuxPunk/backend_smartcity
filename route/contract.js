const ContractController = require("../controller/contract");
const Router = require("express-promise-router");
const { identification } = require("../middleware/Identification");
const { mustBeOwner } = require("../middleware/Authorization");
const router = new Router;

//router.get("/:id", identification, ApartmentController.getApartment);
/**
 * @swagger
 * /contract:
 *  post:
 *      tags:
 *          - Contract
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/ContratACreer'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/ContratCree'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeOwner'
 *          500:
 *              description: Erreur serveur
 *
 */
router.post("/", identification, mustBeOwner, ContractController.addContract);
/**
 * @swagger
 * /contract/{id}:
 *  get:
 *      tags:
 *         - Contract
 *      parameters:
 *          - name: id
 *            description: ID d'un contrat
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/ContractFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeOwner'
 *          404:
 *              description: Contrat non trouvé
 *          500:
 *              description: Erreur serveur
 *
 */
router.get("/:id", identification, mustBeOwner, ContractController.getContract);
/**
 * @swagger
 * /contract/:
 *  get:
 *      tags:
 *         - Contract
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/ContractsFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeOwner'
 *          404:
 *              description: Contrats non trouvés
 *          500:
 *              description: Erreur serveur
 *
 */
router.get("/", identification, mustBeOwner, ContractController.getContracts);

module.exports = router;