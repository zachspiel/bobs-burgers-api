"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var characters_1 = __importDefault(require("../controllers/characters"));
var router = express_1["default"].Router();
router.get('/posts', characters_1["default"].getCharacters);
router.get('/posts/:id', characters_1["default"].getCharacter);
module.exports = router;
