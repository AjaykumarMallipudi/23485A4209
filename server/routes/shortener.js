const express = require("express");
const generateShortId = require("../utils/generateShortId");
const router = express.Router();


const urlDatabase = {};
router.post("/shorten", (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: "URL is required" });

  const shortId = generateShortId();
  urlDatabase[shortId] = originalUrl;

  res.json({ shortUrl: `http://localhost:5000/${shortId}` });
});


router.get("/:shortId", (req, res) => {
  const { shortId } = req.params;
  const originalUrl = urlDatabase[shortId];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).json({ error: "Short URL not found" });
  }
});

module.exports = router;
