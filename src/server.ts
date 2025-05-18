import express, { json, Express } from "express";
import { rateLimit } from "express-rate-limit";
import session from "express-session";
import expressVisitorCounter from "express-visitor-counter";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} from "@apollo/server/plugin/landingPage/default";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import compression from "compression";
import path from "path";
import morgan from "morgan";

import { buildGraphQLSchema } from "./graphql/RootSchema";
import VisitorModel from "./rest/models/VisitorsModel";
import routes from "./rest/routes/router";

dotenv.config();

export const createServer = async (
  app: Express,
  httpServer?: http.Server
): Promise<Express> => {
  await mongoose.connect(process.env.DATABASE_URL ?? "").catch((error) => {
    console.error(error);
  });

  const schema = await buildGraphQLSchema();

  setupRateLimiter(app);

  const plugins = [];
  if (process.env.NODE_ENV === "production") {
    plugins.push(
      ApolloServerPluginLandingPageProductionDefault({
        embed: true,
        graphRef: "Bobs-Burgers-API@current",
      })
    );

    setupVisitorCounter(app);
  } else {
    plugins.push(ApolloServerPluginLandingPageLocalDefault({ embed: true }));
  }

  if (httpServer) {
    plugins.push(ApolloServerPluginDrainHttpServer({ httpServer }));
  }

  const server = new ApolloServer({ schema, plugins });
  await server.start();

  app.use("/graphql", cors<cors.CorsRequest>(), json(), expressMiddleware(server));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use(compression());
  app.use(morgan("combined"));

  app.use("/images", express.static(path.join(__dirname, "../public/images")));
  app.use("/", routes);

  return app;
};

const setupRateLimiter = (app: Express) => {
  const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 200,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  });

  app.use(limiter);
};

const setupVisitorCounter = (app: Express) => {
  app.use(
    session({
      secret: process.env.SECRET ?? "",
      resave: false,
      saveUninitialized: true,
    })
  );

  app.use(expressVisitorCounter({ collection: VisitorModel.collection }));
};
