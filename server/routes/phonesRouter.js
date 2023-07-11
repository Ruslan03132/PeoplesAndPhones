const Router = require("express");
const phonesController = require("../controllers/phonesController");
const router = new Router();

router.post("/", phonesController.addPhone);
router.get("/", phonesController.getPhones);
router.get("/count", phonesController.getRowsCount);
router.delete("/:id", phonesController.deletePhone);
router.put("/", phonesController.updatePhone);

module.exports = router;
