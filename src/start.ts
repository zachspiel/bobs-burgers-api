import http from "http";
import express from "express";
import { createServer } from "./server";

export const startServer = async (): Promise<void> => {
  const app = express();

  await createServer(app);

  const httpServer = http.createServer(app);
  const PORT: any = process.env.PORT ?? 5000;
  httpServer.listen(PORT, () =>
    console.log(`The server is running on port ${PORT} with graphQl path: /graphql`)
  );
};

startServer();
