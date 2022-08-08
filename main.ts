import express from "express";
import expressSession from "express-session";
import { logger } from "./util/logger";
import { userRoutes } from "./util/userRoutes";
import { gameRoutes } from "./util/gameRoutes";
import { knex } from "./util/middlewares";

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

app.use(userRoutes);
app.use(gameRoutes);

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
