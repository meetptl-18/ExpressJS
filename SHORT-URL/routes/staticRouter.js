const express = require("express");
const URL = require("../model/url");
const { restrictTo } = require("../middleware/auth");
const router = express.Router();
router.get("/", restrictTo(["ADMIN", "NORMAL"]), async (req, res) => {
  const allurls = await URL.find({ createdBy: req.user._id });
  res.render("home", {
    urls: allurls,
  });
});

router.get("/admin/url", restrictTo(["ADMIN"]), async (req, res) => {
  const allurls = await URL.find({});
  res.render("home", { urls: allurls });
});
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
