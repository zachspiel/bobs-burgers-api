import { ApolloServer } from "@apollo/server";
import { Express } from "express";
import { expressMiddleware } from "@apollo/server/express4";
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

dotenv.config();

export const createServer = async (app: Express): Promise<Express> => {
  await mongoose.connect(process.env.DATABASE_URL ?? "");

  const schema = await buildGraphQLSchema();
  let plugins = [];
  if (process.env.NODE_ENV === "production") {
    plugins = [
      ApolloServerPluginLandingPageProductionDefault({
        embed: true,
        graphRef: "Bobs-Burgers-API@current",
      }),
    ];
  } else {
    plugins = [ApolloServerPluginLandingPageLocalDefault({ embed: true })];
  }

  const server = new ApolloServer({ schema, plugins });
  await server.start();

  app.use("/graphql", cors<cors.CorsRequest>(), json(), expressMiddleware(server));

  buildExpressServer(app);

  return app;
};
