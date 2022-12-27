const fs = require("fs")
const http = require("http")

const config = JSON.parse(fs.readFileSync("./config.json"))

function combine(p1, p2)
{
    return p1+"/"+p2
}

function findRoute(url)
{
    url = url.replace("..", "")
    const withRoot = combine(config['root-dir'], url)
    if (url.indexOf(".") != -1)
    {
        // Is file
        return withRoot
    } else if (fs.existsSync(withRoot+".htm")) {
        return withRoot+".htm"
    } else if (fs.existsSync(withRoot+".html")) {
        return withRoot+".html"
    } else {
        return combine(withRoot, config["dir-page"])
    }
}

const server = http.createServer((req, res) => {
    const route = findRoute(req.url)

    if (fs.existsSync(route))
    {
        res.writeHead(200, { 'Content-Type': config["response-types"][route.substring(route.lastIndexOf(".")+1)] })
        res.write(fs.readFileSync(route))
    } else {
        res.writeHead(404)
        res.write(fs.readFileSync(combine(config["root-dir"], config["404Page"])))
    }

    res.end()
})

server.listen(8000)
console.log("node js server running")