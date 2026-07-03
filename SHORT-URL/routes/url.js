const express = require("express");
const router = express.Router();

const {
  handlenewShortUrl,
  handleGetAnalytics,
  handleGetRedirectUrl,
} = require("../controller/url");

router.post("/", handlenewShortUrl);
router.get("/analytics/:shortid", handleGetAnalytics);
router.get("/:shortid", handleGetRedirectUrl);

module.exports = router;
