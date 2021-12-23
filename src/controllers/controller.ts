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
        endCreditsSequence: 'https://bobsburgers-api.herokuapp.com/endCreditsSequence/',
    };

    return res.status(200).json(data);
};

const getAllData = async (req: Request, res: Response) => {
    const route = req.params.route;
    if (ROUTES.includes(route)) {
        return res.json(await getData(route, {}));
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

        return res.json(await getData(route, { id: id }));
    } else {
        return res
            .status(400)
            .json(`Error while retreiving data with id ${req.params.id}.`);
    }
};

const getData = async (route: String, data: Record<string, unknown>) => {
    switch (route) {
        case 'episodes':
            const episodes = await Episodes.find(data, '-_id');
            return episodes;
        case 'pestControlTruck':
            const pestControlTrucks = await PestControlTrucks.find(data, '-_id');
            return pestControlTrucks;
        case 'endCreditsSequence':
            const endCreditsSquences = await EndCredits.find(data, '-_id');
            return endCreditsSquences;
        case 'storeNextDoor':
            const storesNextDOor = await StoreNextDoor.find(data, '-_id');
            return storesNextDOor;
        default:
            const characters = await Characters.find(data, '-_id');
            return characters;
    }
};

export default { getRootData, getAllData, getSpecificItem };
