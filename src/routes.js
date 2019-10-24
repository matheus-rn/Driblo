import { Router } from 'express';

import UserController from './app/controllers/UserController';
import PeladaController from './app/controllers/PeladaController';
import PeladaUserController from './app/controllers/PeladaUserController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/pelada', PeladaController.store);
routes.post('/peladaUser', PeladaUserController.store);

export default routes;
