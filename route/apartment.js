const ApartmentController = require("../controller/apartment");
const Router = require("express-promise-router");
const { identification } = require("../middleware/Identification");
const router = new Router;

router.get("/:id", identification, ApartmentController.getApartment);
router.post("/", identification, ApartmentController.addApartment);

module.exports = router;