import {Express, Request, Response} from "express";
import express from 'express';
import * as path from 'path';

const app = express();
const port = 8080;

app.use(express.static(path.resolve("./") + "../../build/client"));

app.get("/", (req: Request, res: Response): void => {
    res.sendFile(path.resolve("./") + "../../build/client/index.html");
})

app.listen(port, () => {
    console.log(`Dog App running at http://localhost:${port}`);
})