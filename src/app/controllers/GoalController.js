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

  async index(req, res){
    const goalExist = await Goal.findOne({ where: { id: req.params.id } });

    if (!goalExist) {
      return res.status(400).json({ error: 'Gol não existe' });
    }

    const gol = await Goal.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'created_at', 'updated_at'],
      include: [
        {
          model: User,
          as: 'goalscorer',
          attributes: ['id', 'name']
        },
        {
          model: User,
          as: 'assistant',
          attributes: ['id', 'name']
        },
        {
          model: Team,
          as: 'team',
          attributes: ['id', 'name']
        }
      ],
    });

    const json = JSON.stringify(gol);
    const result_gol = JSON.parse(json);

    return res.json(result_gol);

  }
}

export default new GoalController();