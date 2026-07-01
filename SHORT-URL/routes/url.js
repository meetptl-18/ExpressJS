const express = require("express");
const router = express.Router();

const {
  handlenewShortUrl,
  handleGetAnaytics,
  handleGetRedirectUrl,
} = require("../controller/url");

router.post("/", handlenewShortUrl);
router.get("/analytics/:shortid", handleGetAnaytics);
router.get("/:shortid", handleGetRedirectUrl);

module.exports = router;
