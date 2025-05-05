// 1. Módulos externos
import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

// 2. Módulos internos (como DB, logger, routers, etc.)
import { connectDb } from "./mongo/connection/mongoConection.js";
import logger from "../logger/winston.js";

// 3. Routers
import paymentRouter from "./routes/payment.router.js";
import apartmentRouter from "./routes/apartment.router.js";
import rentalRouter from "./routes/rental.router.js";

// 4. Configuración de Express
const app = express();
const port = process.env.PORT || 3000;

// 5. Conectar a la base de datos y levantar el servidor
connectDb()
  .then(() => {
    app.listen(port, () => {
      logger.info(`Servidor corriendo en el puerto ${port}`);
    });
  })
  .catch((err) => {
    logger.error("Error al conectar con la base de datos:", err);
  });

// 6. Configuración de __dirname para rutas relativas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 7. Configuración del motor de plantillas (Handlebars)
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// 8. Middlewares de Express
app.use(cors());
app.use("/api/payment", paymentRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 9. Uso de routers
app.use("/api/apartments", apartmentRouter);
app.use("/api/rental", rentalRouter);
