import { Express, NextFunction, Request, Response } from 'express';
import express from 'express';
import * as path from 'path';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

const app = express();
const port = 8080;

// First argument = database filename (no extension = assumed .json)
// Second argument = tell DB to save after each push (false means you have to call the save() method)
// Third argument is to ask JsonDB to save the database in a human readable format (default is false)
// Last argument is the separator (default is /)
const db = new JsonDB(new Config('src/dogs', true, true, '/'));

app.use(express.static(path.resolve('./') + '../../build/client'));

// Enable CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Headers', '*');
  res.append('Access-Control-Allow-Methods', '*');
  next();
});

// Parsing body data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
  res.sendFile(path.resolve('./') + '../../build/client/index.html');
});

interface Dog {
  breed: string,
  id: string
};
interface Dogs extends Array<Dog>{};

app.get('/favourites', (req: Request, res: Response): void => {
  // Send the favourite dogs in the database as a response
  const dogFavourites = db.getData('/dogFavourites');
  res.send(dogFavourites);
});

// Add a new favourite dog to the db
app.post('/newFavourite', (req: Request, res: Response): void => {
  const favDogObject = [{ breed: req.body.breed, id: req.body.id }] as Dogs
  db.push('/dogFavourites', favDogObject, false);
  
  // Send the dog we added as a response to the client
  res.json({ breed: req.body.breed, id: req.body.id })
});

app.delete('/deleteFavourite/:id', (req: Request, res: Response): void => {
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