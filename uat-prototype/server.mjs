import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const docsRoot = new URL("../docs/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "0.0.0.0";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8"
};

const server = createServer(async (req, res) => {
  const path = new URL(req.url || "/", `http://localhost:${port}`).pathname;
  const isDocsRequest = path.startsWith("/docs/");
  const baseRoot = isDocsRequest ? docsRoot : root;
  const requested = path === "/" ? "index.html" : isDocsRequest ? path.slice("/docs/".length) : path.slice(1);
  const filePath = normalize(join(baseRoot, requested));

  if (!filePath.startsWith(normalize(baseRoot))) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const body = await readFile(filePath);
    res.writeHead(200, { "Content-Type": types[extname(filePath)] || "text/plain; charset=utf-8" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(port, host, () => {
  console.log(`UAT prototype: http://${host}:${port}/`);
});
