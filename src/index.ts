import express, { Request, Response } from "express";
import userRoutes from "./routes/v1/user.routes";
import loggerRoute from "./routes/v1/logger.routes";
import mediaRoute from "./routes/v1/Media.routes";
import episodeRoute from "./routes/v1/EpisodeRoute";
import saisonRoute from "./routes/v1/SaisonRoute";
import userRouteV2 from "./routes/v2/user.routes.v2";
import fs from "fs";
import https from "https";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swaggerApi1.json";
import swaggerDocumentV2 from "./swagger/swaggerApi2.json";
import http from "http";
import connectDB from "./data/DbMongo";
// Use require to avoid missing type definitions for cors
const cors = require("cors");
import MovieRouteV2 from "./routes/v2/MovieV2.route";
import SerieRouteV2 from "./routes/v2/SerieRouteV2";
import SeasonRouteV2 from "./routes/v2/SeasonRouteV2";
import EpisodeRouteV2 from "./routes/v2/EpisodeRouteV2";
import RatingRouteV2 from "./routes/v2/RatingRouteV2";
import config from "./config/config";

import HotelRoute from "./routes/v3/HotelRoute";
import HotelLocationRoute from "./routes/v3/HotelLocationRoute";
import HotelQualityRoute from "./routes/v3/HotelQualityRoute";
import BookingRoute from "./routes/v3/BookingRoute";
import UserRoute from "./routes/v3/UserRoute"




import CityCodeNameRoute from './routes/v3/CityCodeNameRoute';
import { ApiCall } from './services/v3/ApiCall';
import { StockHotelService } from './services/v3/StockHotelService';
import { HotelService } from "./services/v3/HotelService";
import { HotelQualityService } from "./services/v3/HotelQualityService";
import { DataTransferService } from "./services/v3/DataTransferService";
import { ToCsvService } from "./services/v3/ToCsvService";
import { AccessDataService } from "./services/v3/AccessDataService";
import { CityCodeNameService } from "./services/v3/CityCodeNameService";

const win = require('./winston/winstonLogger')



const app = express();
const port = config.port;
const logger = win;
const isRender = !!process.env.RENDER;
const isProduction = config.env === "production";

// Middleware HTTPS uniquement en prod derrière proxy

app.use(express.json());
app.use(cors());

// app.use("/api/v1", userRoutes);
// app.use("/api/v1", mediaRoute);
// app.use("/api/v1", loggerRoute);
// app.use("/api/v1", episodeRoute);
// app.use("/api/v1", saisonRoute);

// app.use("/api/v2", userRouteV2);
// app.use("/api/v2", MovieRouteV2);
// app.use("/api/v2", SerieRouteV2);
// app.use("/api/v2", SeasonRouteV2);
// app.use("/api/v2", EpisodeRouteV2);
// app.use("/api/v2", RatingRouteV2);

app.use("/api/v3", CityCodeNameRoute);
app.use("/api/v3", HotelRoute);
app.use("/api/v3", HotelLocationRoute);
app.use("/api/v3", HotelQualityRoute);
app.use("/api/v3", BookingRoute);
app.use("/api/v3", UserRoute)

app.use(
  "/docs/v1",
  swaggerUi.serveFiles(swaggerDocument),
  swaggerUi.setup(swaggerDocument)
);
app.use(
  "/docs/v2",
  swaggerUi.serveFiles(swaggerDocumentV2),
  swaggerUi.setup(swaggerDocumentV2)
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
    // MAINTENANT tu peux appeler ToCsvService
    console.log('Début de la création du CSV...');
     await ToCsvService.createHotelsCsvFile(); // Utilise createCsv() au lieu de createHotelCsv()
     await ToCsvService.createBookingsCsvFile();
    console.log('CSV créé avec succès!');
   //await DataTransferService.combineAllDataForOneHotelForBookingById("692decdb644b62fe2d2c3e9a")
    // await StockHotelService.createHotelByCity("ams",10
    // await AccessDataService.getAllHotelDTo()
    // await StockHotelService.fillBd()
   console.log(await CityCodeNameService.getAllUniqueCityName())
  } catch (error) {
    console.error('Erreur:', error);
  }
};
run();



// ApiCall.getPriceByListOfHotel(["HNPARKGU"])



// DataTransferService.combineAllDataForOneHotelById("WVYYZ096")


