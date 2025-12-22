import express, { Request, Response } from "express";
import fs from "fs";
import https from "https";
import path from "path";
import swaggerUi from "swagger-ui-express";
import http from "http";
import connectDB from "./data/DbMongo";
import cors, { CorsOptions } from "cors";

import config from "./config/config";

import HotelRoute from "./routes/v3/HotelRoute";
import HotelLocationRoute from "./routes/v3/HotelLocationRoute";
import HotelQualityRoute from "./routes/v3/HotelQualityRoute";
import BookingRoute from "./routes/v3/BookingRoute";
import UserRoute from "./routes/v3/UserRoute";
import CityCodeNameRoute from "./routes/v3/CityCodeNameRoute";

import swaggerDocument3 from "./swagger.json";

const win = require("./winston/winstonLogger");
const winError = require("./winston/winstonError");

const app = express();
const port = config.port;
const logger = win;
const isRender = !!process.env.RENDER;

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (config.allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument3, {
    explorer: true,
    customSiteTitle: "Collecte Projet Final – API Docs"
  })
);

app.use("/api/v3", CityCodeNameRoute);
app.use("/api/v3", HotelRoute);
app.use("/api/v3", HotelLocationRoute);
app.use("/api/v3", HotelQualityRoute);
app.use("/api/v3", BookingRoute);
app.use("/api/v3", UserRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express! Connexion sécurisée.");
});

app.use((err: any, req: Request, res: Response, next: any) => {
  winError.error(err);
  res.status(500).json({ message: "Erreur interne du serveur" });
});

if (config.env === "production" && !isRender) {
  const options = {
    key: fs.readFileSync(path.join("./", "key.pem")),
    cert: fs.readFileSync(path.join("./", "cert.pem"))
  };

  https.createServer(options, app).listen(port, () => {
    console.log(`✅ HTTPS Server running on https://localhost:${port}`);
  });

  http
    .createServer((req, res) => {
      res.writeHead(301, {
        Location: `https://${req.headers.host}${req.url}`
      });
      res.end();
    })
    .listen(config.httpPort, () => {
      console.log(
        `⚡ HTTP redirect running on http://localhost:${config.httpPort}`
      );
    });
} else {

  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}

const run = async () => {
  try {
    console.log("Connexion à MongoDB...");
    await connectDB();
    console.log("MongoDB connecté avec succès!");
  } catch (error) {
    console.error("Erreur:", error);
  }
};

run();
