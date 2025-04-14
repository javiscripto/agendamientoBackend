import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { connectDb } from "./connection/mongoConection.js";
import logger from "../logger/winston.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000 || process.env.PORT;

connectDb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//handlebars config

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

//middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//import routers
import paymentRouter from "./routes/payment.router.js";
import testRouter from "./routes/test.router.js";

app.use("/test", testRouter);
app.use("/payment", paymentRouter);

app.listen(port, () => {
  logger.info(`port ${port}`);
});
