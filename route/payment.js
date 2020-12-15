const PaymentController = require("../controller/payment");
const Router = require("express-promise-router");
const { identification } = require("../middleware/Identification");
const { mustBeOwner } = require("../middleware/Authorization");
const router = new Router;

/**
 * @swagger
 * /payment:
 *  post:
 *      tags:
 *          - Payment
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/PaiementACreer'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/PaiementCree'
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
router.post("/", identification, mustBeOwner, PaymentController.addPayment);

/**
 * @swagger
 * /payment/{id}:
 *  delete:
 *      tags:
 *          - Payment
 *      parameters:
 *          - name: id
 *            description: ID d'un paiement
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/PaymentDeleted'
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
router.delete("/:id", identification, mustBeOwner, PaymentController.deletePayment);

module.exports = router;