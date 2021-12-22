"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var ROUTES = [
    'characters',
    'episodes',
    'pestControlTruck',
    'endCreditsSequence',
    'storeNextDoor',
];
var getRootData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        data = {
            characters: 'https://bobsburgers-api.herokuapp.com/characters/',
            episodes: 'https://bobsburgers-api.herokuapp.com/episodes/',
            storeNextDoor: 'https://bobsburgers-api.herokuapp.com/storeNextDoor/',
            pestControlTruck: 'https://bobsburgers-api.herokuapp.com/pestControlTruck/',
            endCreditsSequence: 'https://bobsburgers-api.herokuapp.com/endCreditsSequence/'
        };
        return [2 /*return*/, res.status(200).json(data)];
    });
}); };
var getAllData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var route, data, _a, _b, requestedData;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                route = req.params.route;
                if (!ROUTES.includes(route)) return [3 /*break*/, 2];
                _b = (_a = JSON).parse;
                return [4 /*yield*/, fs_1.promises.readFile("".concat(__dirname, "/../../data.json"), 'utf8')];
            case 1:
                data = _b.apply(_a, [_c.sent()]);
                requestedData = data["".concat(route)];
                return [2 /*return*/, res.status(200).json(requestedData)];
            case 2: return [2 /*return*/, res
                    .status(400)
                    .json("Error while getting data for route: ".concat(route, ". Available options are: characters, pescControlTrucks, endCredits or storeNextDoor."))];
        }
    });
}); };
var getSpecificItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var route, id, data, _a, _b, requestedData;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                route = req.params.route;
                if (!(ROUTES.includes(route) && req.params.id !== undefined)) return [3 /*break*/, 2];
                id = parseInt(req.params.id);
                _b = (_a = JSON).parse;
                return [4 /*yield*/, fs_1.promises.readFile("".concat(__dirname, "/../../data.json"), 'utf8')];
            case 1:
                data = _b.apply(_a, [_c.sent()]);
                requestedData = data["".concat(route)];
                if (isIndexInValid(requestedData, id)) {
                    return [2 /*return*/, res
                            .status(400)
                            .json("Error: id ".concat(id, " is outside of bounds 1 - ").concat(requestedData.length - 1))];
                }
                return [2 /*return*/, res.status(200).json(requestedData[id - 1])];
            case 2: return [2 /*return*/, res.status(400).json("Error while retreiving data with id ".concat(req.params.id, "."))];
        }
    });
}); };
var isIndexInValid = function (array, index) {
    return index < 1 || index > array.length;
};
exports["default"] = { getRootData: getRootData, getAllData: getAllData, getSpecificItem: getSpecificItem };
