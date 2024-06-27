require = require("esm")(module);
const http = require("http");
const https = require("https");
const express = require("express");
const { parseString } = require("xml2js");
const { convertToCSV } = require("./utils/csvConverter");

const app = express();
const cors = require("cors");
app.use(cors());

const fetchRssFeed = (url) => {
  const client = url.startsWith("https") ? https : http;

  return new Promise((resolve, reject) => {
    client
      .get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

app.get("/rss-proxy", async (req, res) => {
  const rssUrl = req.query.url;
  const format = req.query.format;

  try {
    const xmlData = await fetchRssFeed(rssUrl);

    parseString(xmlData, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        res.status(500).send("Failed to parse RSS feed.");
      } else {
        const items = result.rss.channel[0].item.map((item) => ({
          title: item.title[0],
          link: item.link[0],
          description: item.description[0],
          pubDate: item.pubDate[0],
        }));

        if (format === "csv") {
          const csvData = convertToCSV(items);
          res.header("Content-Type", "text/csv");
          res.attachment("parsed_feed.csv");
          res.send(csvData);
        } else {
          res.json(items);
        }
      }
    });
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    res.status(500).send("Failed to fetch RSS feed.");
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
