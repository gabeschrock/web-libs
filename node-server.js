const http = require('http');
const fs = require('fs');

const fileTypes = {
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
    txt: "text/plain",
    ico: "image/x-icon",
}

const errors = {
    ENOENT: [404, "404 Not Found"],
}

function promise(func, ...args) {
    return new Promise((resolve, reject) => {
        func(...args, (err, out) => err ? reject(err) : resolve(out))
    })
}

const server = http.createServer(async function (req, res) {
    // console.log(`${req.method} ${req.url}`)
    let path = `./${req.url}`;
    let stat;
    let data;
    try {
        stat = await promise(fs.stat, path);
        if (!stat.isFile()) {
            path += "/index.html";
        }
        data = await promise(fs.readFile, path);
    } catch(err) {
        // console.error(err.code);
        if (!(err.code in errors)) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.end("Unknown error");
            return;
        }
        let [status, message] = errors[err.code];
        res.writeHead(status, {"Content-Type": "text/plain"})
        res.end(message);
        return;
    }
    const ext = path.match(/.[a-z\-]+$/);
    if (ext) {
        const type = fileTypes[ext[0].slice(1)];
        res.writeHead(200, {"Content-Type": type});
    }

    res.end(data);
})

server.listen(3000, () => {
    console.log("listening on port 3000");
});
