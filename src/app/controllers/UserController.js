import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { id: req.body.id } });

    if (userExists) {
      return res.status(400).json({ error: 'Id existe' });
    }

    const id_user = req.body.id;
    const name_user = req.body.name;

    const { id, name } = await User.create({
      id: id_user,
      name: name_user,
    });

    return res.json({
      id,
      name,
    });
  }
}

export default new UserController();
