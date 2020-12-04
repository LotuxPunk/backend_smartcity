const ApartmentController = require("../controller/apartment");
const Router = require("express-promise-router");
const { identification } = require("../middleware/Identification");
const { mustBeOwner } = require("../middleware/Authorization");
const router = new Router;

router.get("/:id", identification, mustBeOwner, ApartmentController.getApartment);
router.post("/", identification, mustBeOwner, ApartmentController.addApartment);

module.exports = router;