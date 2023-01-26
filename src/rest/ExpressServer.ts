import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import path from "path";
import routes from "./routes/router";

const IMAGES_DIRECTORY = path.join(__dirname, "../../public/images");
var morgan = require("morgan");

export const buildExpressServer = (expressServer: Express): Express => {
  expressServer.use(express.urlencoded({ extended: false }));
  expressServer.use(express.json());
  expressServer.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false,
    })
  );
  expressServer.use(cors());
  expressServer.use(morgan("combined"));

  expressServer.use("/images", express.static(IMAGES_DIRECTORY));
  expressServer.use("/", routes);
  expressServer.use((req, res) => {
    const error = new Error("not found");
    return res.status(404).json({
      message: error.message,
    });
  });

  return expressServer;
};
