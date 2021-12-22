import { Request, Response, NextFunction } from 'express';
import { promises as fs } from 'fs';

const ROUTES = ['characters', 'pestControlTruck', 'endCreditsSequence', 'storeNextDoor'];

interface ApiResponse {
  [key: string]: unknown[];
}

const getRootData = async (req: Request, res: Response) => {
  const data = {
    characters: 'https://bobsburgers-api.herokuapp.com//characters/',
    storeNextDoor: 'https://bobsburgers-api.herokuapp.com//storeNextDoor/',
    pestControlTruck: 'https://bobsburgers-api.herokuapp.com//pestControlTruck/',
    endCreditsSequence: 'https://bobsburgers-api.herokuapp.com//endCreditsSequence/',
  };

  return res.status(200).json(data);
};

const getAllData = async (req: Request, res: Response) => {
  const route = req.params.route;
  if (ROUTES.includes(route)) {
    const data: ApiResponse = JSON.parse(
      await fs.readFile(`${__dirname}/../../data.json`, 'utf8')
    );
    const requestedData = data[`${route}`];

    return res.status(200).json(requestedData);
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
    const data: ApiResponse = JSON.parse(
      await fs.readFile(`${__dirname}/../../data.json`, 'utf8')
    );

    const requestedData = data[`${route}`];

    if (isIndexInValid(requestedData, id)) {
      return res
        .status(400)
        .json(`Error: id ${id} is outside of bounds 1 - ${requestedData.length - 1}`);
    }
    return res.status(200).json(requestedData[id - 1]);
  } else {
    return res.status(400).json(`Error while retreiving data with id ${req.params.id}.`);
  }
};

const isIndexInValid = (array: unknown[], index: number) => {
  return index < 1 || index > array.length;
};

export default { getRootData, getAllData, getSpecificItem };
