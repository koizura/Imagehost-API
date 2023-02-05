const http = require("http");
const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 3005;

const server = http.createServer(app);

const db = require("./DatabaseHandler");
db.init();

server.listen(port);
console.log("listening on port", port);
