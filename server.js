const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const ActionsRouter = require("./data/routers/ActionsRouter");
const ProjectsRouter = require("./data/routers/ProjectsRouter");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);
server.use(cors())

server.use("/api/actions", ActionsRouter);
server.use("/api/projects", ProjectsRouter);

server.get('/', logger, (req, res) => {
    res.send(`<h2>API CHALLENGE</h2>`)
  });

function logger(req, res, next) {
  console.log(`A ${req.method} request to '${req.url}' at '${Date.now()}`);
  next();
}

module.exports = server;