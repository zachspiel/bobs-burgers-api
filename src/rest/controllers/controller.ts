import { Request, Response } from "express";
import { QueryOptions } from "mongoose";
import {
  CharacterModel,
  EndCreditsSequenceModel,
  EpisodeModel,
  PestControlTruckModel,
  StoreNextDoorModel,
  BurgerOfTheDayModel,
  VisitorModel,
} from "../models";

import {
  getArrayParameters,
  getFilters,
  getOptions,
  isArray,
  isCommaSeparated,
} from "../util/util";
import mongoose from "mongoose";

export type Model =
  | "characters"
  | "episodes"
  | "pestControlTruck"
  | "storeNextDoor"
  | "endCreditsSequence"
  | "burgerOfTheDay";

const models: Record<Model, mongoose.Model<any>> = {
  characters: CharacterModel,
  episodes: EpisodeModel,
  pestControlTruck: PestControlTruckModel,
  storeNextDoor: StoreNextDoorModel,
  endCreditsSequence: EndCreditsSequenceModel,
  burgerOfTheDay: BurgerOfTheDayModel,
};

const ROUTES = Object.keys(models);

const getRootData = async (req: Request, res: Response) => {
  const data = {
    graphQL: "https://bobsburgers-api.herokuapp.com/graphql/",
    characters: "https://bobsburgers-api.herokuapp.com/characters/",
    episodes: "https://bobsburgers-api.herokuapp.com/episodes/",
    storeNextDoor: "https://bobsburgers-api.herokuapp.com/storeNextDoor/",
    pestControlTruck: "https://bobsburgers-api.herokuapp.com/pestControlTruck/",
    endCreditsSequence:
      "https://bobsburgers-api.herokuapp.com/endCreditsSequence/",
    burgerOfTheDay: "https://bobsburgers-api.herokuapp.com/burgerOfTheDay/",
  };

  return res.status(200).json(data);
};

const getVisitors = async (req: Request, res: Response) => {
  const date = new Date().toISOString().split("T")[0];
  const [year, month, day] = date.split("-");

  VisitorModel.findOne({
    id: `bobsburgers-api.herokuapp.com-visitors-${day}-${month}-${year}`,
  })
    .exec()
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      sendErrorMessage(
        `Error while getting visitor data. ${error.message}`,
        res
      );
    });
};

const getAllResourcesInEndpoint = async (req: Request, res: Response) => {
  const route = req.params.route as Model;

  if (!ROUTES.includes(route)) {
    return sendErrorMessage(
      `Error while getting data for route: ${route}. Available options are: characters, episodes, pestControlTruck, endCreditsSequence or storeNextDoor.`,
      res,
      404
    );
  }

  const filters = getFilters(req);
  getData(route, filters, getOptions(req))
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      return sendErrorMessage(
        `Error while getting data for route: ${route}. ${error.message}`,
        res
      );
    });
};

const getResourceById = async (req: Request, res: Response) => {
  const route = req.params.route as Model;
  const id = req.params.id;
  let includeMultipleResults = false;
  let filter = {};

  const errorMessage = `Error while retreiving data with id ${id} in route ${route}.`;

  if (!ROUTES.includes(route) || id === undefined) {
    return sendErrorMessage(errorMessage, res);
  }

  if (isArray(id) || isCommaSeparated(id)) {
    filter = getArrayParameters(id);
    includeMultipleResults = true;
  } else if (!isArray(id) && !isNaN(parseInt(id))) {
    filter = { id: parseInt(id) };
  }

  getData(route, filter, {})
    .then((result) => {
      if (result.length === 0) {
        return sendErrorMessage(errorMessage, res);
      }

      return includeMultipleResults ? res.json(result) : res.json(result[0]);
    })
    .catch((error) => {
      return sendErrorMessage(
        `Error while getting data for route: ${route}. ${error.message}`,
        res
      );
    });
};

const getData = async (
  route: Model,
  data: Record<string, unknown>,
  options: QueryOptions
): Promise<unknown[]> => {
  const model = models[route];

  return await model
    .find(data, "-_id")
    .sort(options.sort)
    .limit(options.limit)
    .skip(options.skip)
    .exec();
};

const sendErrorMessage = (
  message: string,
  response: Response,
  status = 500
) => {
  return response.status(status).json({ error: message });
};

export {
  getRootData,
  getVisitors,
  getAllResourcesInEndpoint,
  getResourceById,
  getData,
};
