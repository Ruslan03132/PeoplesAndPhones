const Router = require("express");
const router = new Router();

const peoplesRouter = require("./peoplesRouter");
const phonesRouter = require("./phonesRouter");
router.use("/peoples", peoplesRouter);
router.use("/phones", phonesRouter);


module.exports = router;  