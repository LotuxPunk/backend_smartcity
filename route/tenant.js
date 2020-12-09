const TenantController = require("../controller/tenant");
const Router = require("express-promise-router");
const { identification } = require("../middleware/Identification");
const { mustBeOwner } = require("../middleware/Authorization");
const router = new Router;

router.post("/", identification, mustBeOwner, TenantController.addTenant);
router.get("/", identification, mustBeOwner, TenantController.getTenants);

module.exports = router;