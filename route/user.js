const UserController = require("../controller/user");

const Router = require("express-promise-router");
const router = new Router;

router.post("/", UserController.createUser);
router.post("/login", UserController.loginUser)

module.exports = router;