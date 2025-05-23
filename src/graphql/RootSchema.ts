import { buildSchema } from "type-graphql";
import path from "path";
import { GraphQLSchema } from "graphql";
import "reflect-metadata";

import { BurgerOfTheDayResolver } from "./resolvers/BurgerOfTheDayResolver";
import { CharacterResolver } from "./resolvers/CharacterResolver";
import { EpisodeResolver } from "./resolvers/EpisodeResolver";
import { PestControlTruckResolver } from "./resolvers/PestControlTruckResolver";
import { StoreNextDoorResolver } from "./resolvers/StoreNextDoorResolver";

export const buildGraphQLSchema = async (): Promise<GraphQLSchema> => {
  return buildSchema({
    resolvers: [
      BurgerOfTheDayResolver,
      CharacterResolver,
      EpisodeResolver,
      PestControlTruckResolver,
      StoreNextDoorResolver,
    ],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    globalMiddlewares: [],
    validate: false,
  });
};
