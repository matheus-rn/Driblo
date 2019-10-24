import User from '../models/User';
import Pelada from '../models/Pelada';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { id: req.body.id } });

    if (userExists) {
      return res.status(400).json({ error: 'Id existe' });
    }

    const id_user = req.body.id;
    const name_user = req.body.name;

    const { id, name } = await User.create({
      id: id_user,
      name: name_user,
    });

    return res.json({
      id,
      name,
    });
  }

  async index(req, res) {
    const user = await User.findOne({
      where: {
        id: 123,
      },
      attributes: ['id', 'name'],
      include: [
        {
          model: Pelada,
          as: 'peladas',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json({ user });
  }
}

export default new UserController();
