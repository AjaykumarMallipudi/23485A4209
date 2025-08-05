import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;

    try {
      const res = await axios.post('http://localhost:5000/shorten', { originalUrl });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      alert('Error shortening URL');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL"
          style={{ width: '300px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 12px', marginLeft: '10px' }}>
          Shorten
        </button>
      </form>

      {shortUrl && (
        <div style={{ marginTop: '20px' }}>
          <strong>Short URL:</strong>{' '}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
