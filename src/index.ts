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
import { DataTransfertService } from "./services/v3/DataTransfertService";

const win = require('./winston/winstonLogger')



const app = express();
const port = config.port;
const logger = win;

const isProduction = config.env === "production";

// Middleware HTTPS uniquement en prod derrière proxy

app.use(express.json());

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

if (config.env === "production") {
  // Options SSL
  const options = {
    key: fs.readFileSync(path.join("./", "key.pem")),
    cert: fs.readFileSync(path.join("./", "cert.pem")),
  };

  // Serveur HTTPS
  https.createServer(options, app).listen(config.port, () => {
    console.log(
      `✅ Serveur HTTPS en prod sur https://localhost:${config.port}`
    );
  });

  // Serveur HTTP redirection HTTPS
  const httpPort = 80;
  http
    .createServer((req, res) => {
      res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
      res.end();
    })
    .listen(httpPort, () => {
      console.log(
        `⚡ Serveur HTTP en prod sur http://localhost:${httpPort} → redirection HTTPS`
      );
    });
} else {
  // http basic
  app.listen(config.port, () => {
    console.log(
      `🚀 Serveur ${config.env} en dev sur http://localhost:${config.port}`
    );
  });
}

const run = async () => {
  // Connect to MongoDB
  await connectDB();
};
run();



// ApiCall.getPriceByListOfHotel(["HNPARKGU"])

// StockHotelService.createHotelByPriceApi(["je suis faux ahhh faux"])


DataTransfertService.combineAllDataForOneHotelById("WVYYZ096")




