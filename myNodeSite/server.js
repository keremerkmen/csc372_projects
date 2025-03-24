// server.js
// ----------------------------------------------
// Custom Node.js server to serve static files
// for the URI Sailing Team website project.
//
// This serves HTML, CSS, JS, images, and a custom 404 page.
// ----------------------------------------------

const http = require("http");
const fs = require("fs");
const path = require("path");

// Set the port number
const port = 1337;

// Helper function to serve static files
function serveStaticFile(res, filePath, contentType, responseCode = 200) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Internal Server Error
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 - Internal Server Error");
    } else {
      res.writeHead(responseCode, { "Content-Type": contentType });
      res.end(data);
    }
  });
}

// Create the server
const server = http.createServer((req, res) => {
  // Normalize the URL path
  let urlPath = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
  if (urlPath === "") urlPath = "/index.html";

  const extname = path.extname(urlPath);
  const publicPath = path.join(__dirname, "public");

  // Map extensions to content types
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".ico": "image/x-icon",
  };

  const filePath = path.join(publicPath, urlPath);

  // Serve file if extension is known
  if (mimeTypes[extname]) {
    serveStaticFile(res, filePath, mimeTypes[extname]);
  } else if (extname === "") {
    // If no extension, assume HTML (e.g., /about → about.html)
    serveStaticFile(res, filePath + ".html", "text/html");
  } else {
    // File type not recognized or missing file — show 404
    serveStaticFile(res, path.join(publicPath, "404.html"), "text/html", 404);
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});