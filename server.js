const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
const INDEX_PATH = path.join(__dirname, "index.html");

const server = http.createServer((req, res) => {
  fs.readFile(INDEX_PATH, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Failed to load index.html");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Tactical Strike server running at http://localhost:${PORT}`);
});
