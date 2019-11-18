import UserTeam from '../models/UserTeam';
import Team from '../models/Team'
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

    const players = req.body.players;

    const pelada = await Pelada.findOne({where: {id: req.params.id}});

    const list = FormTeams.calcularTimes(players, pelada.quantityPlayers);

    Team.destroy({
      where: {
          peladaId: pelada.id
      }
    })

    if(pelada.quantityPlayers > 0){

      const name_team_1 = ('Time ' + pelada.name + ' 1');

      const name_team_2 = ('Time ' + pelada.name + ' 2');

      const team1 = await Team.create({ "name": name_team_1, "peladaId": pelada.id});

      const team2 = await Team.create({ "name": name_team_2, "peladaId": pelada.id});

      list.teams[0].forEach(player => {
        UserTeam.create({"userId": player.id, "teamId": team1.id})
      });

      list.teams[1].forEach(player => {
        UserTeam.create({"userId": player.id, "teamId": team2.id})
      });
    }

    return res.json(list);

  }
}

export default new UserTeamController();
