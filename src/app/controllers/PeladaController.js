import Pelada from '../models/Pelada';
import User from '../models/User';
import UserPelada from '../models/UserPelada';
import Team from '../models/Team';

class PeladaController {
  async store(req, res) {
    const pelada = await Pelada.create(req.body);

    return res.json(pelada);
  }

  async index(req, res) {
    const peladaExist = await Pelada.findOne({ where: { id: req.params.id } });

    if (!peladaExist) {
      return res.status(400).json({ error: 'Pelada não existe' });
    }

    const pelada = await Pelada.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name'],
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: Team,
          as: 'teams',
          attributes: ['id', 'name']
        }
      ],
    });

    const json = JSON.stringify(pelada);
    const result_pelada = JSON.parse(json);

    result_pelada.users = await Promise.all(
      result_pelada.users.map(async user => {
        const { userPresent } = await UserPelada.findOne({
          where: {
            user_id: user.id,
            pelada_id: pelada.id,
          },
        });
        user.userPresent = userPresent;
        return user;
      })
    );

    return res.json(result_pelada);
  }

  async update(req, res) {
    const peladaExist = await Pelada.findOne({ where: { id: req.params.id } });

    if (!peladaExist) {
      return res.status(400).json({ error: 'Pelada não existente' });
    }

    const response = await Pelada.update(req.body, {
      where: { id: req.params.id },
    });

    return res.json(response);
  }

  async destroy(req, res) {
    const peladaExists = await Pelada.findOne({ where: { id: req.params.id } });

    if (!peladaExists) {
      return res.status(400).json({ error: 'Pelada não existente' });
    }

    const response = await Pelada.destroy({
      where: { id: req.params.id },
      cascade: true,
    });

    return res.json({ response });
  }
}

export default new PeladaController();
