import Pelada from '../models/Pelada';
import User from '../models/User';
import PeladaUser from '../models/PeladaUser';

class PeladaController {
  async store(req, res) {
    const pelada = await Pelada.create(req.body);

    return res.json(pelada);
  }

  async index(req, res) {
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
      ],
    });

    const json = JSON.stringify(pelada);
    const result_pelada = JSON.parse(json);

    result_pelada.users = await Promise.all(
      result_pelada.users.map(async user => {
        const { userPresent } = await PeladaUser.findOne({
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
}

export default new PeladaController();
