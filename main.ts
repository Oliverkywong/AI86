import express from "express";
import expressSession from "express-session";
import fs from "fs";
import { logger } from "./util/logger";
import { file, knex } from "./util/middlewares";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(
  expressSession({
    secret: "whatever",
    resave: true,
    saveUninitialized: true,
  })
);

let sessions = {};
app.use((req, res, next) => {
  sessions = req.session;
  console.log(sessions);
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

import { userService } from "./services/userService";
import { userController } from "./controllers/userController";
import { createUserRoutes } from "./util/userRoutes";

const userservice = new userService(knex);
const usercontroller = new userController(userservice)
app.use(createUserRoutes(usercontroller));

app.use(express.static("private"));

const port = process.env.PORT || 8989
app.listen(port, function () {
  logger.info("listening on port 8989");
});
