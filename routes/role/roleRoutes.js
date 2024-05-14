const roleController = require("../../controllers/role/roleController");
const express = require("express");

const router = express.Router();

router.post("/createRole", roleController.createRole);
router.delete("/deleteRole/:id", roleController.deleteRole);

module.exports = router;
