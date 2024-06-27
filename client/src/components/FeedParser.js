// FeedParser.js

import React, { useState } from 'react';
import axios from 'axios';

const FeedParser = () => {
  const [url, setUrl] = useState('');
  const [feedData, setFeedData] = useState(null);
  const [error, setError] = useState(null);

  const parseFeed = async () => {
    if (!url) return;

    try {
      const response = await axios.get(`http://localhost:3001/rss-proxy?url=${encodeURIComponent(url)}`);

      setFeedData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching or parsing RSS feed:", error);
      setError("Failed to fetch RSS feed.");
      setFeedData(null);
    }
  };

  const downloadCSV = async () => {
    try {
      const csvResponse = await axios.get(`http://localhost:3001/rss-proxy?url=${encodeURIComponent(url)}&format=csv`, {
        responseType: 'blob'
      });

      const csvBlob = new Blob([csvResponse.data], { type: 'text/csv' });
      const csvUrl = window.URL.createObjectURL(csvBlob);
      const link = document.createElement('a');
      link.href = csvUrl;
      link.setAttribute('download', 'parsed_feed.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CSV:", error);
      setError("Failed to download CSV.");
    }
  };

  return (
    <div className="feed-parser">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter RSS/Atom URL"
      />
      <button onClick={parseFeed}>Parse</button>
      <button onClick={downloadCSV}>Download CSV</button>

      {error && <p className="error-message">{error}</p>}

      {feedData && (
        <div className="parsed-feed">
          <h2>Parsed Feed</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {feedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.link}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeedParser;
