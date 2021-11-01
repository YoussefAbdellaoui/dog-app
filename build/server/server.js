"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
const app = (0, express_1.default)();
const port = 8080;
// First argument = database filename (no extension = assumed .json)
// Second argument = tell DB to save after each push (false means you have to call the save() method)
// Third argument is to ask JsonDB to save the database in a human readable format (default is false)
// Last argument is the separator (default is /)
const db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config('src/dogs', true, true, '/'));
app.use(express_1.default.static(path.resolve('./') + '../../build/client'));
// Enable CORS
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Headers', '*');
    res.append('Access-Control-Allow-Methods', '*');
    next();
});
// Parsing body data
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./') + '../../build/client/index.html');
});
;
;
app.get('/favourites', (req, res) => {
    // Send the favourite dogs in the database as a response
    const dogFavourites = db.getData('/dogFavourites');
    res.send(dogFavourites);
});
// Add a new favourite dog to the db
app.post('/newFavourite', (req, res) => {
    const favDogObject = [{ breed: req.body.breed, id: req.body.id }];
    db.push('/dogFavourites', favDogObject, false);
    // Send the dog we added as a response to the client
    res.json({ breed: req.body.breed, id: req.body.id });
});
app.delete('/deleteFavourite/:id', (req, res) => {
    // Get the index of the Dog ID and remove it from the DB
    const dbIndex = db.getIndex('/dogFavourites', req.params.id);
    db.delete(`/dogFavourites[${dbIndex}]`);
    // Send the new db array as a response to confirm it's been deleted
    const dogFavourites = db.getData('/dogFavourites');
    res.send(dogFavourites);
});
app.listen(port, () => {
    console.log(`Dog App running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map