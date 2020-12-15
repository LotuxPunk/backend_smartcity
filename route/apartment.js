const ApartmentController = require("../controller/apartment");
const Router = require("express-promise-router");
const multer = require('multer');
const shortid = require("shortid");
const mime = require("mime-types");

const { identification } = require("../middleware/Identification");
const { mustBeOwner } = require("../middleware/Authorization");
const router = new Router;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        let id = shortid.generate();
        let ext = mime.extension(file.mimetype);
        cb(null, `${id}.${ext}`);
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

/**
 * @swagger
 * /apartment:
 *  get:
 *      tags:
 *         - Apartment
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/ApartmentsFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeOwner'
 *          404:
 *              description: Appartements non trouvé
 *          500:
 *              description: Erreur serveur
 *
 */
router.get("/", identification, mustBeOwner, ApartmentController.getApartments);

/**
 * @swagger
 * /apartment:
 *  post:
 *      tags:
 *          - Apartment
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/AppartementACreer'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AppartementCree'
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
router.post("/", identification, mustBeOwner, upload.single("image"), ApartmentController.addApartment);

module.exports = router;