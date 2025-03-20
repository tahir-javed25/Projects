import { readFile, writeFile } from 'fs/promises';
import { createServer } from 'http';
import path from 'path';
import crypto from "crypto"

const PORT = 54700;

const DATA_PATH = path.join("Data","links.json")

const serveFile = async(res,filePath,content)=>{
    try {
        const data = await readFile(filePath)
        res.writeHead(200, { "Content-Type": content })
        res.end(data);
    } catch (error) {
        res.writeHead(404, { "Content-Type": "text/plain"})
        res.end("404 page not Found")
    }

}

const loadLinks =async()=>{
    try {
        const data = await readFile(DATA_PATH,"utf-8")
        return JSON.parse(data);
    } catch (error) {
        if(error.code ==="ENOENT"){
            await writeFile(DATA_PATH,JSON.stringify({}));
            return {}
        }
        throw error;
    }
}
const savelinks =async(links)=>{     // getting the links that is passed in function call
    await writeFile(DATA_PATH,JSON.stringify(links));

}

const server = createServer(async (req, res) => {
    // working with GET method  1st Step
    if (req.method === "GET") {
        if (req.url === "/") {
            serveFile(res,path.join("public", "index.html"),"text/html")  
        }
    // we don't need to start from the req.method as we are already setting the request method as "GET", that's why this was causing error. 2nd step
    else if (req.url === "/style.css") {
            serveFile(res, path.join("public", "style.css"), "text/css")

            // Serving the links to frontend as making api for sending to the frontend at second last step
        }else if (req.url === "/links"){
            const links = await loadLinks();
            res.writeHead(200,{"Content-Type":"application/json"})
            return res.end(JSON.stringify(links))
        }else {
            const links = await loadLinks();
            const shortCode = req.url.slice(1);
            const link = links[shortCode];
            if(link){
                res.writeHead(302, {location :link})
                return res.end();
            }
        }
    }
// Now we are going to work with the POST method. 3rd step

if(req.method ==="POST" && req.url === "/shorten"){
    const links = await loadLinks();

    let body =""; 
    req.on("data",(chunk)=> body += chunk )
    req.on("end",async()=>{
        console.log("Raw Body",body);
        const {url, shortCode} = JSON.parse(body);
// check weather the url is present or not
        if(!url){
            res.writeHead(200, { "Content-Type": "text/plain" })
            return res.end("URL is Required");
        }
        // to check the duplicate
        const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
        if(links[finalShortCode]){
            console.log("Code Already exsits, Please wirte again")
            res.writeHead(400, { "Content-Type": "text/plain" })
            return res.end("Code Already exsits, Please wirte again");
        }
        // add data to link.json
        links[finalShortCode] = url;     // this line is making sure that we will get the data in Object formate (json formate) finalSHortCode will become the key and url will become the value
        await savelinks(links);


        res.writeHead(200,{"Content-Type":"application/json"});
        res.end(JSON.stringify({success:true, shortCode:finalShortCode}))

    });
}
});


server.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});

