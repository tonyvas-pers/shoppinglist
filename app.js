const PORT = process.env.SERVER_PORT;
const express = require("express");

console.clear()
setEnv();
startServer();

function setEnv(){
    // Set environment variables
    process.env.USER_DATA_DIR = `${__dirname}/userdata`
    process.env.DEFAULT_COLLECTION_JSON_PATH = `${__dirname}/default-collection.json`
}

function startServer(){
    const app = express();

    app.all("*", (req, res, next) => {
        // Log each request
        console.log(`${new Date().toLocaleString()} | ${req.socket.remoteAddress} | ${req.url}`);
        next();
    });
    
    // Use json parser for http POST PUT and DELETE requests
    app.use(express.json());
    // Serve front end
    app.use(express.static(`${__dirname}/client`));
    // Handle api routes
    app.use('/api', require('./api/routes'));

    app.listen(PORT, () => {
        console.log(`HTTP server running on port ${PORT}`);
    });
}