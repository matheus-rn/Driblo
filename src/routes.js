import { Router } from 'express';

import UserController from './app/controllers/UserController';
import PeladaController from './app/controllers/PeladaController';
import PeladaUserController from './app/controllers/PeladaUserController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.index);
routes.post('/pelada', PeladaController.store);
routes.get('/pelada/:id', PeladaController.index);
routes.post('/peladaUser', PeladaUserController.addUserPelada);

export default routes;
