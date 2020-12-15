const TenantController = require("../controller/tenant");
const Router = require("express-promise-router");
const { identification } = require("../middleware/Identification");
const { mustBeOwner } = require("../middleware/Authorization");
const router = new Router;

/**
 * @swagger
 * /tenant:
 *  post:
 *      tags:
 *          - Tenant
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/LocataireACreer'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/LocataireCree'
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
router.post("/", identification, mustBeOwner, TenantController.addTenant);

/**
 * @swagger
 * /tenant/:
 *  get:
 *      tags:
 *         - Tenant
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/TenantsFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeOwner'
 *          404:
 *              description: Locataires non trouvé
 *          500:
 *              description: Erreur serveur
 *
 */
router.get("/", identification, mustBeOwner, TenantController.getTenants);

module.exports = router;