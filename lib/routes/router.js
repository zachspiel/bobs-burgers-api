"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var controller_1 = __importDefault(require("../controllers/controller"));
var router = express_1["default"].Router();
router.get('/', controller_1["default"].getRootData);
router.get('/:route', controller_1["default"].getAllData);
router.get('/:route/:id', controller_1["default"].getSpecificItem);
module.exports = router;
