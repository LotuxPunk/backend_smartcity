const UserController = require("../controller/user");
const Router = require("express-promise-router");
const { identification } = require("../middleware/Identification");
const router = new Router;

router.post("/", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/:id", identification, UserController.getUser);

module.exports = router;