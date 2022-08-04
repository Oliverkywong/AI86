import express from "express";
import expressSession from "express-session";
import fs from "fs";
import path from "path";
// import http from "http";
// import { Server as SocketIO } from "socket.io";
import { logger } from "./util/logger";

const uploadDir = 'trainAI'
const file = path.join(uploadDir, 'bestAI.json')
fs.mkdirSync(uploadDir, { recursive: true })
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, '[]')
}

const app = express();
app.use(express.json());
app.use(express.urlencoded());
// const server = http.createServer(app);
// const io = new SocketIO(server);

app.use(
  expressSession({
    secret: "whatever",
    resave: true,
    saveUninitialized: true,
  })
);
// let sessions = {};

app.use((req, res, next) => {
  // sessions = req.session;
  next();
});

app.get('/traincar', async (req, res) => {
  res.send(await fs.promises.readFile(file, 'utf8'));

});

app.post('/traincar', async(req, res) => {
  let bestAI = JSON.parse(await fs.promises.readFile(file, 'utf8'));
  bestAI.push({"AI01":req.body});
  await fs.promises.writeFile(file, JSON.stringify(bestAI));
})

app.use(express.static("public"));
app.use(express.static("private"));

const port = 8989;
app.listen(port, function () {
  logger.info("listening on port 8989");
});
