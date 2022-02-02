import { Request, Response } from 'express';
import { QueryOptions } from 'mongoose';
import Characters from '../models/characterModel';
import EndCredits from '../models/endCreditModel';
import Episodes from '../models/episodeModel';
import PestControlTrucks from '../models/pestControlTruckModel';
import StoreNextDoor from '../models/storeModel';
import path from 'path';
import { getOptions, getTotalFilesInFolder } from '../util/util';
import * as fs from 'fs';

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

const getAllData = async (req: Request, res: Response) => {
  const route = req.params.route;
  if (ROUTES.includes(route)) {
    const result = await getData(route, {}, getOptions(req));

    result.forEach((item: Record<any, any>, index: number) => {
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

    const result = (await getData(route, { id: id }, {})) as Record<any, any>;

    return res.json(sanitizeResult(result[0]));
  } else {
    return res.status(400).json(`Error while retreiving data with id ${req.params.id}.`);
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

const getData = async (
  route: String,
  data: Record<string, unknown>,
  options: QueryOptions
) => {
  for (const [key, model] of Object.entries(models)) {
    if (key === route) {
      return await model.find(data, '-_id', options);
    }
  }

  return [];
};

const getImage = async (req: Request, res: Response) => {
  const { file, folder } = req.params;
  const errorMessage =
    file === undefined ? 'No image was provided in url' : `Image ${file} was not found`;
  const targetDirectory = path.join(__dirname, '../../public/images', folder);

  if (fs.existsSync(targetDirectory)) {
    const targetId = file.split('.')[0];
    let totalImages = getTotalFilesInFolder(targetDirectory.toString());
    const outOfBoundsError = `Image ${file} is outside of bounds ${totalImages} for directory ${folder}`;

    if (!Number.isNaN(Number(targetId)) && Number(targetId) <= totalImages) {
      const filePath = path.join(targetDirectory, file);
      return res.sendFile(path.resolve(filePath));
    }

    sendErrorMessage(res, outOfBoundsError);
  } else {
    sendErrorMessage(res, errorMessage);
  }
};

const sendErrorMessage = (response: Response, message: string) => {
  return response.status(404).json({
    message: message,
  });
};

export default { getRootData, getAllData, getSpecificItem, getImage };
