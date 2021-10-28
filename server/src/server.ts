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
  next();
});

app.get('/', (req: Request, res: Response): void => {
  res.sendFile(path.resolve('./') + '../../build/client/index.html');
});


// Pushing data into database with the wanted data path
// By default the push overrides the old value
// interface FooBar {
//   Hello: string;
//   World: number;
// }
// const object = { Hello: 'World', World: 5 } as FooBar;
// db.push('/test', object);
// const result = db.getObject<FooBar>('/test');
// res.send(result);

// TS Interface for the objects
interface Dog {
  breed: string,
  id: string
};
interface Dogs extends Array<Dog>{};

// DOGS
app.get('/dogs', (req: Request, res: Response): void => {
  const dogArray = db.getData("/");
  res.send(dogArray);
});

// Add a new dog to the db
app.get('/dogs/:breed/:id', (req: Request, res: Response): void => {
  res.json({ breed: req.params.breed, id: req.params.id });


  const dogObject = [{ breed: req.params.breed, id: req.params.id }] as Dogs;

  // last parameter = override the data or not (false will merge it)
  db.push('/dogs', dogObject, false);
});

// FAVOURITE DOGS
app.get('/favourites', (req: Request, res: Response): void => {
  const dogFavourites = db.getData('/dogFavourites');
  res.send(dogFavourites);
});

// Add a new favourite dog to the db
app.get('/dogFavourites/:breed/:id', (req: Request, res: Response): void => {
  res.json({ breed: req.params.breed, id: req.params.id });

  const favDogObject = [{ breed: req.params.breed, id: req.params.id }] as Dogs;

  // last parameter = override the data or not (false will merge it)
  db.push('/dogFavourites', favDogObject, false);
});

app.listen(port, () => {
  console.log(`Dog App running at http://localhost:${port}`);
});