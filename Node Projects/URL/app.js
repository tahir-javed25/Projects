import { readFile } from 'fs/promises';
import {createServer} from 'http';
import path from 'path';
const PORT = 57400

const server = createServer(async (req, res) => {
    console.log(`Request received: Method=${req.method}, URL=${req.url}`);
    if (req.method === "GET") {
        if (req.url === "/") {
            try {
                const data = await readFile(path.join("public", "index.html"));
                console.log("Serving index.html...");
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            } catch (error) {
                console.error("Error serving index.html:", error);
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("404 page not Found");
            }
        } else if (req.url === "/style.css") {
            try {
                const data = await readFile(path.join("public", "style.css"));
                console.log("Serving style.css...");
                res.writeHead(200, { "Content-Type": "text/css" });
                res.end(data);
            } catch (error) {
                console.error("Error serving style.css:", error);
                res.writeHead(404, { "Content-Type": "text/css" });
                res.end("404 page not Found");
            }
        } else {
            console.log(`Unhandled URL: ${req.url}`);
        }
    }
});

server.listen(PORT, ()=>{
        console.log(`server is running at http://localhost:${PORT}`);
    });


