import Sequelize from 'sequelize';
import UserPelada from '../models/UserPelada';
import Pelada from '../models/Pelada';
import User from '../models/User';

class UserPeladaController {
  async addUserPelada(req, res) {
    const peladaUser = await UserPelada.findOne({
      where: { user_id: req.body.userId, pelada_id: req.body.peladaId },
    });

    if (peladaUser) {
      return res
        .status(400)
        .json({ error: 'Usuário já está cadastrado na pelada' });
    }

    const response = await UserPelada.create(req.body);

    return res.json(response);
  }

  async removeUserPelada(req, res) {
    const peladaUser = await UserPelada.findOne({
      where: { user_id: req.params.userId, pelada_id: req.params.peladaId },
    });

    if (!peladaUser) {
      return res
        .status(400)
        .json({ error: 'Usuário não está cadastrado na pelada' });
    }

    const response = await UserPelada.destroy({
      where: { user_id: req.params.userId, pelada_id: req.params.peladaId },
    });

    return res.json({ response });
  }

  async confirmPresent(req, res) {
    const peladaUser = await UserPelada.findOne({
      where: { user_id: req.params.userId, pelada_id: req.params.peladaId },
    });

    if (!peladaUser) {
      return res
        .status(400)
        .json({ error: 'Usuário não está cadastrado na pelada' });
    }
    const response = UserPelada.update(
      { userPresent: req.body.userPresent },
      {
        where: { user_id: req.params.userId, pelada_id: req.params.peladaId },
      }
    );

    return res.json({ response });
  }

  async listPlayersPresent(req, res) {
    const peladaExist = await Pelada.findOne({ where: { id: req.params.id } });

    if (!peladaExist) {
      return res.status(400).json({ error: 'Pelada não existe' });
    }

    const usersPresents = await UserPelada.findAll({
      where: { user_present: true },
    });

    const listIdUser = usersPresents.map(user => user.userId);

    const { Op } = Sequelize;

    const pelada = await Pelada.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name'],
      include: [
        {
          required: false,
          model: User,
          as: 'users',
          where: {
            id: {
              [Op.or]: listIdUser.length ? listIdUser : [null],
            },
          },
          attributes: ['id', 'name', 'photoUrl'],
          through: { attributes: [] },
        },
      ],
    });

    return res.json(pelada);
  }
}

export default new UserPeladaController();
