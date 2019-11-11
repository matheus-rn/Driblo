import Goal from '../models/Goal';

class GoalController {
  async store(req, res) {
    const goal = await Goal.create(req.body);

    return res.json(goal);
  }
}

export default new GoalController();
