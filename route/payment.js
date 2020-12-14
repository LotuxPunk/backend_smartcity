const PaymentController = require("../controller/payment");
const Router = require("express-promise-router");
const { identification } = require("../middleware/Identification");
const { mustBeOwner } = require("../middleware/Authorization");
const router = new Router;

router.post("/", identification, mustBeOwner, PaymentController.addPayment);
router.delete("/:id", identification, mustBeOwner, PaymentController.deletePayment);

module.exports = router;