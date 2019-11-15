import Goal from '../models/Goal';
import UserPelada from '../models/UserPelada';

class GoalController {
  async store(req, res) {
    const goal = await Goal.create(req.body);
    const userGoal = await UserPelada.findOne({
      where: { user_id: req.body.goalscorerId, pelada_id: req.body.peladaId },
    });

    await userGoal.update({ score: userGoal.score + 8 });

    if (goal.goalassistantId) {
      const userAssistant = await UserPelada.findOne({
        where: { user_id: goal.goalassistantId, pelada_id: req.body.peladaId },
      });
      await userAssistant.update({ score: userAssistant.score + 5 });
    }
    return res.json(goal);
  }
}

export default new GoalController();
