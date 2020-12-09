const UserRouter = require("./user");
const ApartmentRouter = require("./apartment");
const ContractRouter = require("./contract");
const PaymentRouter = require("./payment");
const TenantRouter = require("./tenant");
const router = require("express").Router();

router.use("/user", UserRouter);
router.use("/apartment", ApartmentRouter);
router.use("/contract", ContractRouter);
router.use("/payment", PaymentRouter);
router.use("/tenant", TenantRouter);

module.exports = router;
