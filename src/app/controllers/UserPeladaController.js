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

    // peladaUser.update({ userPresent: true });
    return res.json(response);
  }
}

export default new UserPeladaController();
