import express from "express";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import Cafeteria from "./router";
import db from "./config/db";

console.log("BOOT:");

// Conectar a base de datos
async function connectDB() {
  try {
    await db.authenticate();
    await db.sync();
    // console.log(colors.magenta("Base de datos conectada"));
  } catch (error) {
    console.log(colors.bgRed.white("Hubo un error al conectar a la BD"));
  }
}
connectDB();

const server = express();

server.set("trust proxy", 1);

// ---------- CORS ----------
server.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// ---------- fin CORS ----------

server.use(express.json());
server.use(morgan("dev"));

// Rutas API
server.use("/api", Cafeteria);
server.get("/api", (_req, res) => {
  res.json("Desde API");
});

// Docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// 404
server.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada", path: req.originalUrl });
});

// Manejador de errores
server.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(" Error:", err?.message || err);
    res.status(err?.status || 500).json({
      error: err?.message || "Error interno del servidor",
    });
  }
);

export default server;
