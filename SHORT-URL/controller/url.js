const shortid = require("shortid");
const URL = require("../model/url");
async function handlenewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ Msg: "URL required" });
  const shortId = shortid();
  await URL.create({
    ShortId: shortId,
    redirectURL: body.url,
    visitedHistroy: [],
  });
  const allUrls = await URL.find({});
  return res.render("home", { id: shortId, urls: allUrls });
}

async function handleGetRedirectUrl(req, res) {
  const shortID = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    { ShortId: shortID },
    { $push: { visitedHistroy: { timestamp: Date.now() } } },
  );
  res.redirect(entry.redirectURL);
}
async function handleGetAnaytics(req, res) {
  const shortId = req.params.shortid;
  const result = await URL.findOne({ ShortId: shortId });
  res.json({
    totalClicks: result.visitedHistroy.length,
    anaytics: result.visitedHistroy,
  });
}

module.exports = { handlenewShortUrl, handleGetAnaytics, handleGetRedirectUrl };
