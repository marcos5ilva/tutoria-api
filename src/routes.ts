import express, { response } from 'express';
import Controllers  from './controllers/controllers';
import { SchemaBuilder } from 'knex';
import db from './database/connection';


const routes = express.Router();

const controllers = new Controllers();

routes.get('/ping', (req, resp) => {
  return resp.send('pong');
});

routes.post('/lessons', controllers.create);
routes.get('/lessons', controllers.index);

export default routes;
