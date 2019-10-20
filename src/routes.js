import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();
routes.get('/', async (req, res) => {
  const user = await User.create({
    id: 123,
    name: 'matheus',
  }).catch(() => {
    return { error: 'Usuário já existente' };
  });

  return res.json(user);
});

export default routes;
