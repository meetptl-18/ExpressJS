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
    createdBy: req.user._id,
  });

  return res.render("home", { id: shortId });
}

async function handleGetRedirectUrl(req, res) {
  const shortID = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    { ShortId: shortID },
    { $push: { visitedHistroy: { timestamp: Date.now() } } },
  );
  if (!entry) {
    return res.status(404).send("URL not found");
  }
  res.redirect(entry.redirectURL);
}
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortid;
  const result = await URL.findOne({ ShortId: shortId });
  res.json({
    totalClicks: result.visitedHistroy.length,
    anaytics: result.visitedHistroy,
  });
}

module.exports = {
  handlenewShortUrl,
  handleGetAnalytics,
  handleGetRedirectUrl,
};
