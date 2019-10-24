import Pelada from '../models/Pelada';

class PeladaController {
  async store(req, res) {
    const { id, name } = await Pelada.create(req.body);

    return res.json({
      id,
      name,
    });
  }
}

export default new PeladaController();
