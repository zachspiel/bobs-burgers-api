import { Request, Response } from 'express';
import Characters from '../models/characterModel';
import EndCredits from '../models/endCreditModel';
import Episodes from '../models/episodeModel';
import PestControlTrucks from '../models/pestControlTruckModel';
import StoreNextDoor from '../models/storeModel';

const ROUTES = [
  'characters',
  'episodes',
  'pestControlTruck',
  'endCreditsSequence',
  'storeNextDoor',
];

const getRootData = async (req: Request, res: Response) => {
  const data = {
    characters: 'https://bobsburgers-api.herokuapp.com/characters/',
    episodes: 'https://bobsburgers-api.herokuapp.com/episodes/',
    storeNextDoor: 'https://bobsburgers-api.herokuapp.com/storeNextDoor/',
    pestControlTruck: 'https://bobsburgers-api.herokuapp.com/pestControlTruck/',
    endCreditsSequence:
      'https://bobsburgers-api.herokuapp.com/endCreditsSequence/',
  };

  return res.status(200).json(data);
};

const getAllData = async (req: Request, res: Response) => {
  const route = req.params.route;
  if (ROUTES.includes(route)) {
    const result = await getData(route, {}, getOptions(req));

    result.forEach((item, index) => {
      result[index] = sanitizeResult(item);
    });

    return res.json(result);
  } else {
    return res
      .status(400)
      .json(
        `Error while getting data for route: ${route}. Available options are: characters, pescControlTrucks, endCredits or storeNextDoor.`
      );
  }
};

const getSpecificItem = async (req: Request, res: Response) => {
  const route = req.params.route;

  if (ROUTES.includes(route) && req.params.id !== undefined) {
    let id: number = parseInt(req.params.id);

    const result = (await getData(route, { id: id })) as Record<any, any>;

    return res.json(sanitizeResult(result[0]));
  } else {
    return res
      .status(400)
      .json(`Error while retreiving data with id ${req.params.id}.`);
  }
};

const sanitizeResult = (result: Record<any, any>) => {
  if (
    result !== undefined &&
    result.relatives !== undefined &&
    result.relatives.length === 0
  ) {
    const resultObject = result.toObject();

    const { relatives, ...filtered } = resultObject;

    return filtered;
  }

  return result;
};

const getOptions = (req: Request) => {
  const sort: Record<string, unknown> = {};

  if (req.query.sortBy) {
    const orderBy = req.query?.OrderBy ?? '';

    sort[req.query?.sortBy.toString()] = orderBy === 'desc' ? -1 : 1;
  }

  const options: Record<string, unknown> = {
    sort,
  };

  if (req.query.limit !== undefined) {
    const limit = req.query.limit.toString();

    if (!isNaN(limit as any)) {
      options.limit = parseInt(limit);
    }
  }

  if (req.query.skip !== undefined) {
    const skip = req.query.skip.toString();

    if (!isNaN(skip as any)) {
      options.skip = parseInt(skip);
    }
  }

  return options;
};
const getData = async (
  route: String,
  data: Record<string, unknown>,
  options?: Record<string, unknown>
) => {
  switch (route) {
    case 'episodes':
      const episodes = await Episodes.find(data, '-_id', options ?? {});
      return episodes;
    case 'pestControlTruck':
      const pestControlTrucks = await PestControlTrucks.find(
        data,
        '-_id',
        options ?? {}
      );
      return pestControlTrucks;
    case 'endCreditsSequence':
      const endCreditsSquences = await EndCredits.find(
        data,
        '-_id',
        options ?? {}
      );
      return endCreditsSquences;
    case 'storeNextDoor':
      const storesNextDOor = await StoreNextDoor.find(
        data,
        '-_id',
        options ?? {}
      );
      return storesNextDOor;
    default:
      const characters = await Characters.find(data, '-_id', options ?? {});
      return characters;
  }
};

export default { getRootData, getAllData, getSpecificItem };
