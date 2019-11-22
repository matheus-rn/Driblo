import { async } from 'q';
import UserTeam from '../models/UserTeam';
import Team from '../models/Team';
import * as FormTeams from '../utils/formTeams';
import Pelada from '../models/Pelada';

class UserTeamController {
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

  async formTeams(req, res) {
    const { players } = req.body;

    const pelada = await Pelada.findOne({ where: { id: req.params.id } });

    const list = FormTeams.calcularTimes(players, pelada.quantityPlayers);

    Team.destroy({
      where: {
        peladaId: pelada.id,
      },
    });

    if (pelada.quantityPlayers > 0) {
      // iterates over number of teams
      for (let i = 0; i < list.teams.length; i++) {
        // creates a team for each iteration
        const team = await Team.create({
          name: `Time ${i + 1}`,
          peladaId: pelada.id,
        });

        // iterates over number of members in each team
        for (let j = 0; j < list.teams[i].length; j++) {
          // adds an user in a team for each iteration
          await UserTeam.create({
            userId: list.teams[i][j].id,
            teamId: team.id,
          });
        }
      }
    }

    return res.json(list);
  }
}

export default new UserTeamController();
