const UserRouter = require("./user");
const ApartmentRouter = require("./apartment");
const router = require("express").Router();

router.use("/user", UserRouter);
router.use("/apartment", ApartmentRouter);

module.exports = router;
