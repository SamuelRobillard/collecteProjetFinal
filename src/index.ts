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
import UserRoute from "./routes/v3/UserRoute"
import CityCodeNameRoute from './routes/v3/CityCodeNameRoute';
import { ToCsvService } from "./services/v3/ToCsvService";
import { CityCodeNameService } from "./services/v3/CityCodeNameService";
import swaggerDocument3 from "./swagger/swaggerApi3.json"
const win = require('./winston/winstonLogger')

const app = express();
const port = config.port;
const logger = win;
const isRender = !!process.env.RENDER;
const isProduction = config.env === "production";

// Middleware HTTPS uniquement en prod derrière proxy

app.use(express.json());

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, mobile apps, curl)
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


app.use("/api/v3", CityCodeNameRoute);
app.use("/api/v3", HotelRoute);
app.use("/api/v3", HotelLocationRoute);
app.use("/api/v3", HotelQualityRoute);
app.use("/api/v3", BookingRoute);
app.use("/api/v3", UserRoute)

app.use(
  "/docs",
  swaggerUi.serveFiles(swaggerDocument3),
  swaggerUi.setup(swaggerDocument3)
);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express! Connexion sécurisée.");

});

// Créer le serveur HTTPS

if (config.env === "production" && !isRender) {
  // HTTPS local / serveur dédié
  const options = {
    key: fs.readFileSync(path.join("./", "key.pem")),
    cert: fs.readFileSync(path.join("./", "cert.pem"))
  };

  https.createServer(options, app).listen(config.port, () => {
    console.log(`✅ HTTPS Server running on https://localhost:${config.port}`);
  });

  // Redirection HTTP → HTTPS
  http
    .createServer((req, res) => {
      res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
      res.end();
    })
    .listen(config.httpPort, () => {
      console.log(`⚡ HTTP redirect running on http://localhost:${config.httpPort}`);
    });
} else {
  // Render ou dev normal
  app.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port}`);
  });
}


const run = async () => {
  // // Connect to MongoDB
  // await connectDB();
  try {
    // Connect to MongoDB
    console.log('Connexion à MongoDB...');
    await connectDB();
    console.log('MongoDB connecté avec succès!');



    //  await ToCsvService.createHotelsCsvFile(); 
    //  await ToCsvService.createBookingsCsvFile();


    // await StockHotelService.fillBd()



  } catch (error) {
    console.error('Erreur:', error);
  }
};
run();
