const express = require("express");
const badgeController = require("../controllers/badge.controller");
const auth = require("../middlewares/auth");
const { authorize } = require("../utils/role");

const router = express.Router();

router.post("/", auth, authorize("admin"), badgeController.createBadge);
router.get("/", auth, authorize("admin"), badgeController.getAllBadges);
router.put("/:badgeId", auth, authorize("admin"), badgeController.updateBadge);
router.delete(
  "/:badgeId",
  auth,
  authorize("admin"),
  badgeController.deleteBadge
);

module.exports = router;
