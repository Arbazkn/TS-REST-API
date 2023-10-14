import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import monogoose from "mongoose";

import router from "./router";

// should come from the config files:
const MONGODB_PASS = "2wojwVd2yKzj5JZU";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

const MONGODB_URL =
  "mongodb+srv://abzkn93:" +
  MONGODB_PASS +
  "@cluster0.vhvzshz.mongodb.net/?retryWrites=true&w=majority";

monogoose.Promise = Promise;
monogoose.connect(MONGODB_URL);
monogoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
