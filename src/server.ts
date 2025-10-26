import express from "express";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import Cafeteria from "./router";
import db from "./config/db";

console.log("BOOT:");

// ------- Conexión a la base de datos -------
async function connectDB() {
  try {
    await db.authenticate();
    await db.sync();
    console.log(colors.magenta("Base de datos conectada ✔"));
  } catch (error) {
    console.log(colors.bgRed.white("Hubo un error al conectar a la BD"));
  }
}
connectDB();

const server = express();

server.use(cors());
server.options("*", cors());

// ------- Middleware -------
server.use(express.json());
server.use(morgan("dev"));

// ------- Rutas -------
server.use("/api", Cafeteria);

server.get("/api", (_req, res) => {
  res.json({ ok: true, msg: "Desde API" });
});

// ------- Swagger -------
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default server;
