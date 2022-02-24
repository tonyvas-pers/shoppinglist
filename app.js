const PORT = process.env.SERVER_PORT;
const express = require("express");

console.clear()
startServer();





function startServer(config, pingers){
    const app = express();

    app.all("*", (req, res, next) => {
        console.log(`${new Date().toLocaleString()} | ${req.socket.remoteAddress} | ${req.url}`);
        next();
    });

    app.get('/', (req, res) => {
        res.end('xd');
    })

    app.listen(PORT, () => {
        console.log(`HTTP server running on port ${PORT}`);
    });
}