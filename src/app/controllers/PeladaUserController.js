import PeladaUser from '../models/PeladaUser';

class PeladaUserController {
  async store(req, res) {
    const { userId, peladaId } = await PeladaUser.create(req.body);

    return res.json({
      userId,
      peladaId,
    });
  }
}

export default new PeladaUserController();
