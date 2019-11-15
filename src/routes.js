import { Router } from 'express';

import UserController from './app/controllers/UserController';
import PeladaController from './app/controllers/PeladaController';
import UserPeladaController from './app/controllers/UserPeladaController';
import TeamController from './app/controllers/TeamController';
import GoalController from './app/controllers/GoalController';
import { multerUploads } from './app/middlewares/multer';
import FileController from './app/controllers/FileController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.index);
routes.delete('/users/:id', UserController.destroy);
routes.put('/users/:id', UserController.update);

routes.post('/pelada', PeladaController.store);
routes.get('/pelada/:id', PeladaController.index);
routes.delete('/pelada/:id', PeladaController.destroy);
routes.put('/pelada/:id', PeladaController.update);

routes.post('/teams', TeamController.store);

routes.post('/goals', GoalController.store);

routes.post('/peladaUser', UserPeladaController.addUserPelada);
routes.get(
  '/pelada/:id/users-presents',
  UserPeladaController.listPlayersPresent
);

routes.get(
  '/pelada/:id/highlights-of-game',
  UserPeladaController.highlightsOfGame
);

routes.put(
  '/users/:userId/pelada/:peladaId',
  UserPeladaController.confirmPresent
);

routes.delete(
  '/users/:userId/pelada/:peladaId',
  UserPeladaController.removeUserPelada
);

routes.post('/files', multerUploads, FileController.store);

export default routes;
