const UserRouter = require("./user");
const ApartmentRouter = require("./apartment");
const ContractRouter = require("./contract");
const PaymentRouter = require("./payment");
const router = require("express").Router();

router.use("/user", UserRouter);
router.use("/apartment", ApartmentRouter);
router.use("/contract", ContractRouter);
router.use("/payment", PaymentRouter);

module.exports = router;
