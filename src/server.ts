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
    //console.log(colors.magenta("Base de datos conectada aaaa"));
  } catch (error) {
    //console.log(error);
    console.log(colors.bgRed.white("Hubo un error al conectar a la BD"));
  }
}

connectDB();

// Instacia de express
const server = express();

// Permitir conexiones

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de cors"));
    }
  },
};

server.use(cors(corsOptions));

// Leer datos de formularios
server.use(express.json());

server.use(morgan("dev"));

server.use("/api", Cafeteria);

server.get("/api", (req, res) => {
  res.json("Desde API");
});

//Docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default server;
