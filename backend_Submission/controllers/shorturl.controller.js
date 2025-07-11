const geoip = require('geoip-lite');
const nanoid = require('../utils/generateCode');

const urls = {};    // { shortcode: { originalUrl, expiry, createdAt, clicks: [] } }

exports.createShortUrl = (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ error: "Invalid or missing URL" });
  }

  const code = shortcode || nanoid();
  if (urls[code]) {
    return res.status(400).json({ error: "Shortcode already in use" });
  }

  const now = new Date();
  const expiry = new Date(now.getTime() + validity * 60 * 1000);

  urls[code] = {
    originalUrl: url,
    createdAt: now.toISOString(),
    expiry: expiry.toISOString(),
    clicks: []
  };

  res.status(201).json({
    shortLink: `${process.env.BASE_URL}/${code}`,
    expiry: expiry.toISOString()
  });
};

exports.redirectShortUrl = (req, res) => {
  const { shortcode } = req.params;
  const record = urls[shortcode];

  if (!record) return res.status(404).json({ error: "Shortcode not found" });

  const now = new Date();
  if (new Date(record.expiry) < now) {
    return res.status(410).json({ error: "Link has expired" });
  }

  const ip = req.ip;
  const geo = geoip.lookup(ip);
  const referrer = req.headers.referer || "direct";

  record.clicks.push({
    timestamp: now.toISOString(),
    referrer,
    country: geo?.country || "Unknown"
  });

  res.redirect(record.originalUrl);
};

exports.getStats = (req, res) => {
  const { shortcode } = req.params;
  const record = urls[shortcode];

  if (!record) return res.status(404).json({ error: "Shortcode not found" });

  res.json({
    totalClicks: record.clicks.length,
    originalUrl: record.originalUrl,
    createdAt: record.createdAt,
    expiryAt: record.expiry,
    clickDetails: record.clicks
  });
};
