"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./routes/router"));
var helmet_1 = __importDefault(require("helmet"));
var router = (0, express_1["default"])();
router.use(express_1["default"].urlencoded({ extended: false }));
router.use(express_1["default"].json());
router.use((0, helmet_1["default"])());
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).json({});
    }
    next();
});
router.use('/', router_1["default"]);
router.use(function (req, res, next) {
    var error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});
var httpServer = http_1["default"].createServer(router);
var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 6060;
httpServer.listen(PORT, function () { return console.log("The server is running on port ".concat(PORT)); });
