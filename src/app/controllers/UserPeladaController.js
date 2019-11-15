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

  async highlightsOfGame(req, res) {
    const highlights = {
      topScore: [],
      topAssistants: [],
      topGoals: [],
    };

    const users = await UserPelada.findAll();
    const maxValueScore = users.reduce((a, b) => {
      return Math.max(a.score, b.score);
    });

    const maxValueGoals = users.reduce((a, b) => {
      return Math.max(a.goals, b.goals);
    });

    const maxValueAssistants = users.reduce((a, b) => {
      return Math.max(a.assistances, b.assistances);
    });

    const topUser = async (id, value) => {
      const user = await User.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      const json = JSON.stringify(user);
      const result_user = JSON.parse(json);
      result_user.value = value;
      return result_user;
    };

    highlights.topScore = await Promise.all(
      users.map(async user => {
        return user.score === maxValueScore
          ? topUser(user.userId, maxValueScore)
          : null;
      })
    );
    highlights.topScore = highlights.topScore.filter(n => n);

    highlights.topGoals = await Promise.all(
      users.map(async user => {
        return user.goals === maxValueGoals
          ? topUser(user.userId, maxValueGoals)
          : null;
      })
    );
    highlights.topGoals = highlights.topGoals.filter(n => n);

    highlights.topAssistants = await Promise.all(
      users.map(async user => {
        return user.assistances === maxValueAssistants
          ? topUser(user.userId, maxValueAssistants)
          : null;
      })
    );
    highlights.topAssistants = highlights.topAssistants.filter(n => n);

    return res.json(highlights);
  }
}

export default new UserPeladaController();
