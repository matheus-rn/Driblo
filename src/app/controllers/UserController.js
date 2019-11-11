import User from '../models/User';
import Pelada from '../models/Pelada';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { id: req.body.id } });

    if (userExists) {
      return res.status(400).json({ error: 'Id existente' });
    }

    const user = await User.create({
      id: req.body.id,
      name: req.body.name,
      photoUrl: req.body.photoUrl,
    });

    return res.json(user);
  }

  async index(req, res) {
    const userExists = await User.findOne({ where: { id: req.params.id } });

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existe' });
    }

    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name'],
      include: [
        {
          model: Pelada,
          as: 'peladas',
          attributes: {
            exclude: ['updatedAt', 'createdAt'],
          },
          through: { attributes: [] },
        },
      ],
    });

    return res.json(user);
  }

  async update(req, res) {
    const userExists = await User.findOne({ where: { id: req.params.id } });

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existente' });
    }

    const update_user = await User.update(req.body, {
      where: { id: req.params.id },
    });

    return res.json(update_user);
  }

  async destroy(req, res) {
    const userExists = await User.findOne({ where: { id: req.params.id } });

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existente' });
    }

    const delete_user = await User.destroy({ where: { id: req.params.id } });

    return res.json({ delete_user });
  }
}

export default new UserController();
