import UserPelada from '../models/UserPelada';

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
}

export default new UserPeladaController();
