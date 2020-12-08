const ContractController = require("../controller/contract");
const Router = require("express-promise-router");
const { identification } = require("../middleware/Identification");
const { mustBeOwner } = require("../middleware/Authorization");
const router = new Router;

//router.get("/:id", identification, ApartmentController.getApartment);
router.post("/", identification, mustBeOwner, ContractController.addContract);
router.get("/:id", identification, mustBeOwner, ContractController.getContract);
router.get("/", identification, mustBeOwner, ContractController.getContracts);

module.exports = router;