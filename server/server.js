const express = require('express');
const logger = require('./middleware/logger');
const app = express();
const PORT = 3000;

const urlDatabase = {};

app.use(express.json());
app.use(logger);

app.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
});


app.post('/shorten', (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  const shortId = Math.random().toString(36).substring(2, 8);
  urlDatabase[shortId] = originalUrl;

  res.json({ shortUrl: `http://localhost:${PORT}/${shortId}` });
});

app.get('/:shortId', (req, res) => {
  const { shortId } = req.params;
  const originalUrl = urlDatabase[shortId];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
