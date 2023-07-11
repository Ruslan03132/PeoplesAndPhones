const Router = require("express");
const router = new Router();

const PeoplesController = require("../controllers/peoplesController");

router.post("/", PeoplesController.addPeople);
router.get("/", PeoplesController.getPeoples);
router.get("/count", PeoplesController.getRowsCount);
router.get("/:id", PeoplesController.getPeople);
router.delete("/:id", PeoplesController.deletePeople);
router.put("/", PeoplesController.updatePeople);

module.exports = router;  
                        