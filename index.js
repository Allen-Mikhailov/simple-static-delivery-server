const fs = require("fs")
const http = require("http")

const config = JSON.parse(fs.readFileSync("./config.json"))
const routes = JSON.parse(fs.readFileSync("./routes.json"))

function findRoute(url)
{
    let route 
    let subs = url.substring(1).split("/")
    // console.log(subs)

    return "."+url
}

const server = http.createServer((req, res) => {
    const route = findRoute(req.url)

    console.log(req.url)
    console.log(route)
    console.log(route.split(".")[1])

    if (fs.existsSync(route))
    {
        res.writeHead(200, { 'Content-Type': config["response-types"][route.split(".")[1]] })
        res.write(fs.readFileSync(route))
    } else {
        res.writeHead(404)
        res.write(fs.readFileSync(config["404Page"]))
    }

    res.end()
})

server.listen(8000)
console.log("node js server running")