import express, { response } from 'express';
import LessonsController  from './controllers/LessonsController';
import { SchemaBuilder } from 'knex';
import db from './database/connection';


const routes = express.Router();

const lessonController = new LessonsController();

routes.get('/ping', (req, resp) => {
  return resp.send('pong');
});

routes.post('/lessons', lessonController.create);
routes.get('/lessons', lessonController.index);

export default routes;
