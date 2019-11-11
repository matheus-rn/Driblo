import Goal from '../models/Goal';
import User from '../models/User';
import UserPelada from '../models/UserPelada';
import Team from '../models/Team';

class GoalController {
  async store(req, res) {
    const goal = await Goal.create(req.body);

    return res.json(goal);
  }


  async destroy(req, res) {
    const goalExists = await Goal.findOne({ where: { id: req.params.id } });

    if (!goalExists) {
      return res.status(400).json({ error: 'Gol não existente' });
    }

    const delete_gol = await Goal.destroy({ where: { id: req.params.id } });

    return res.json({ delete_gol });
  }

  async update(req, res) {
    const goalExists = await Goal.findOne({ where: { id: req.params.id } });

    if (!goalExists) {
      return res.status(400).json({ error: 'Gol não existente' });
    }

    const update_goal = await Goal.update(req.body, {
      where: { id: req.params.id },
    });

    return res.json({update_goal});
  }
}

export default new GoalController();