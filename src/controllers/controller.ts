import { Request, response, Response } from 'express';
import { QueryOptions } from 'mongoose';
import Characters from '../models/characterModel';
import EndCredits from '../models/endCreditModel';
import Episodes from '../models/episodeModel';
import PestControlTrucks from '../models/pestControlTruckModel';
import StoreNextDoor from '../models/storeModel';
import { filterResult, getOptions } from '../util/util';

const ROUTES = [
  'characters',
  'episodes',
  'pestControlTruck',
  'endCreditsSequence',
  'storeNextDoor',
];

const models = {
  characters: Characters,
  episodes: Episodes,
  pestControlTruck: PestControlTrucks,
  storeNextDoor: StoreNextDoor,
  endCreditsSequence: EndCredits,
};

const getRootData = async (req: Request, res: Response) => {
  const data = {
    characters: 'https://bobsburgers-api.herokuapp.com/characters/',
    episodes: 'https://bobsburgers-api.herokuapp.com/episodes/',
    storeNextDoor: 'https://bobsburgers-api.herokuapp.com/storeNextDoor/',
    pestControlTruck: 'https://bobsburgers-api.herokuapp.com/pestControlTruck/',
    endCreditsSequence: 'https://bobsburgers-api.herokuapp.com/endCreditsSequence/',
  };

  return res.status(200).json(data);
};

const getAllResourcesInEndpoint = async (req: Request, res: Response) => {
  const route = req.params.route;

  if (ROUTES.includes(route)) {
    const result = await getData(route, {}, getOptions(req));
    const filtered = filterResult(result, req.query);

    return res.json(filtered);
  } else {
    return sendErrorMessage(
      `Error while getting data for route: ${route}. Available options are: characters, episodes, pestControlTrucks, endCreditsSequence or storeNextDoor.`,
      res
    );
  }
};

const getResourceById = async (req: Request, res: Response) => {
  const route = req.params.route;

  if (ROUTES.includes(route) && req.params.id !== undefined) {
    const id: number = parseInt(req.params.id);
    const result = await getData(route, { id: id }, {});

    if (result.length === 0) {
      return sendErrorMessage(
        `Error while retreiving data with id ${req.params.id}.`,
        res
      );
    }

    return res.json(result[0]);
  }

  return sendErrorMessage(
    `Error while retreiving data with id ${req.params.id} in route ${route}.`,
    res
  );
};

const getData = async (
  route: String,
  data: Record<string, unknown>,
  options: QueryOptions
) => {
  for (const [key, model] of Object.entries(models)) {
    if (key === route) {
      return await model
        .find(data, '-_id')
        .limit(options.limit ?? 502)
        .skip(options.skip ?? 0)
        .sort(options.sort ?? 'asc');
    }
  }

  return [];
};

const sendErrorMessage = (message: string, response: Response) => {
  return response.status(500).json({ error: message });
};

export default { getRootData, getAllResourcesInEndpoint, getResourceById };
