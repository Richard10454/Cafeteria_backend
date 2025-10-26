import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
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
    db.sync();
    // console.log(colors.magenta("Base de datos conectada"));
  } catch (error) {
    console.log(colors.bgRed.white("Hubo un error al conectar a la BD"));
  }
}
connectDB();

const server = express();

server.set("trust proxy", 1);

// ---------- CORS ----------
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean) as string[];

const allowedRegex = [/\.onrender\.com$/];

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    const ok =
      allowedOrigins.includes(origin) ||
      allowedRegex.some((re) => re.test(origin));

    if (ok) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true, // si usas cookies/autorización
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

server.use(cors(corsOptions));
server.options("*", cors(corsOptions));

server.use(express.json());

// Logs
server.use(morgan("dev"));

// Rutas API
server.use("/api", Cafeteria);
server.get("/api", (_req, res) => {
  res.json("Desde API");
});

// Docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default server;
