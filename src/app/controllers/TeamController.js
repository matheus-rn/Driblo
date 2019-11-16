import Team from '../models/Team';
import Pelada from '../models/Pelada';
import Goal from '../models/Goal';

class TeamController {
  async store(req, res) {
    const team = await Team.create(req.body);

    return res.json(team);
  }

  async index(req, res){
    const teamExist = await Team.findOne({ where: { id: req.params.id } });

    if (!teamExist) {
      return res.status(400).json({ error: 'Time não existe' });
    }

    const team = await Team.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name'],
      include: [
        {
          model: Pelada,
          as: 'pelada',
          attributes: ['id', 'name']
        },
        {
          model: Goal,
          as: 'goals'
        }
      ]
    });

    const json = JSON.stringify(team);
    const result_team = JSON.parse(json);

    return res.json(result_team);

  }
}



export default new TeamController();
