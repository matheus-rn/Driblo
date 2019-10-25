import { Router } from 'express';

import UserController from './app/controllers/UserController';
import PeladaController from './app/controllers/PeladaController';
import PeladaUserController from './app/controllers/PeladaUserController';

const routes = new Router();

routes.post('/users', UserController.createUser);
routes.get('/users/:id', UserController.searchUser);
routes.post('/pelada', PeladaController.createPelada);
routes.get('/pelada/:id', PeladaController.searchPelada);
routes.post('/peladaUser', PeladaUserController.store);

export default routes;
