import { ApolloServer } from "@apollo/server";
import { Express } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createSession from "express-session";
import expressVisitorCounter from "express-visitor-counter";
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} from "@apollo/server/plugin/landingPage/default";
import cors from "cors";
import { json } from "express";
import { buildGraphQLSchema } from "./graphql/RootSchema";
import { buildExpressServer } from "./rest/ExpressServer";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { rateLimit } from "express-rate-limit";
import { VisitorModel } from "./rest/models/";

dotenv.config();

export const createServer = async (app: Express): Promise<Express> => {
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

  const server = new ApolloServer({ schema, plugins });
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server)
  );

  buildExpressServer(app);

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
    createSession({
      secret: process.env.SECRET ?? "",
      resave: false,
      saveUninitialized: true,
    })
  );

  app.use(expressVisitorCounter({ collection: VisitorModel.collection }));
};
