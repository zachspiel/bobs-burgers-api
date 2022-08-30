import http from "http";
import express, { Express } from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { buildGraphQLSchema } from "./graphql/RootSchema";
import { buildExpressServer } from "./rest/ExpressServer";

dotenv.config();
export const createServer = async (
  app: Express
): Promise<ApolloServer<ExpressContext>> => {
  const schema = await buildGraphQLSchema();

  const server = new ApolloServer({ schema });
  await server.start();
  server.applyMiddleware({ app });
  buildExpressServer(app);

  return server;
};

export const startServer = async (): Promise<void> => {
  const app = express();
  await mongoose.connect(process.env.DATABASE_URL ?? "");

  const server = await createServer(app);

  const httpServer = http.createServer(app);
  const PORT: any = process.env.PORT ?? 5000;
  httpServer.listen(PORT, () =>
    console.log(
      `The server is running on port ${PORT} with graphQl path: ${server.graphqlPath}`
    )
  );
};

startServer();
