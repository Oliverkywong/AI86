// Imports

import express from "express";
import expressSession from "express-session";
import { logger } from "./util/logger";
import { userRoutes } from "./util/userRoutes";
import { gameRoutes } from "./util/gameRoutes";
import { isLogin, knex } from "./util/middlewares";
import { userService } from "./services/userService";
import { userController } from "./controllers/userController";
import { createUserRoutes } from "./util/userRoutes";

// Constants

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

app.use(express.static("public"));
// Routes
app.use(userRoutes);
app.use(gameRoutes);

// User Related

const userservice = new userService(knex);
const usercontroller = new userController(userservice)
app.use(createUserRoutes(usercontroller));


// Move to bottom if need login
app.use(isLogin,express.static("private"));

const port = process.env.PORT || 8989
app.listen(port, function () {
  logger.info(`listening on port ${port}`);
});

