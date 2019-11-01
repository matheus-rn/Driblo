import { Router } from 'express';

import UserController from './app/controllers/UserController';
import PeladaController from './app/controllers/PeladaController';
import UserPeladaController from './app/controllers/UserPeladaController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.index);
routes.delete('/users/:id', UserController.destroy);
routes.put('/users/:id', UserController.update);

routes.post('/pelada', PeladaController.store);
routes.get('/pelada/:id', PeladaController.index);
routes.delete('/pelada/:id', PeladaController.destroy);
routes.put('/pelada/:id', PeladaController.update);

routes.post('/peladaUser', UserPeladaController.addUserPelada);

export default routes;
