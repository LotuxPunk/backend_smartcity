const UserRouter = require("./user");
const ApartmentRouter = require("./apartment");
const ContractRouter = require("./contract");
const router = require("express").Router();

router.use("/user", UserRouter);
router.use("/apartment", ApartmentRouter);
router.use("/contract", ContractRouter);

module.exports = router;
