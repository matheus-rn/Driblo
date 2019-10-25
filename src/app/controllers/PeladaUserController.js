import PeladaUser from '../models/PeladaUser';

class PeladaUserController {
  async store(req, res) {
    const { userId, peladaId, userPresent } = await PeladaUser.create(req.body);

    return res.json({
      userId,
      peladaId,
      userPresent,
    });
  }
}

export default new PeladaUserController();
