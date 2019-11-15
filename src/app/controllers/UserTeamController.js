import UserTeam from '../models/UserTeam';

class UserPeladaController {
  async addUserTeam(req, res) {
    const userTeam = await UserTeam.findOne({
      where: { user_id: req.body.userId, team_id: req.body.teamId },
    });

    if (userTeam) {
      return res.status(400).json({ error: 'Usuário já está neste time' });
    }

    const response = await UserTeam.create(req.body);

    return res.json(response);
  }

  async removeUserTeam(req, res) {
    const userTeam = await UserTeam.findOne({
      where: { user_id: req.params.userId, team_id: req.params.teamId },
    });

    if (!userTeam) {
      return res.status(400).json({ error: 'Usuário não está neste time' });
    }

    const response = await UserTeam.destroy({
      where: { user_id: req.params.userId, team_id: req.params.teamId },
    });

    return res.json({ response });
  }
}

export default new UserPeladaController();
