import User from '../models/User';
import Pelada from '../models/Pelada';
import PeladaUser from '../models/PeladaUser';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { id: req.body.id } });

    if (userExists) {
      return res.status(400).json({ error: 'Id existente' });
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
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      ],
    });
    const json = JSON.stringify(user);
    const result_user = JSON.parse(json);

    result_user.peladas = await Promise.all(
      result_user.peladas.map(async pelada => {
        const { userPresent } = await PeladaUser.findOne({
          where: {
            user_id: user.id,
            pelada_id: pelada.id,
          },
        });
        pelada.userPresent = userPresent;
        return pelada;
      })
    );

    return res.json(result_user);
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
