import Team from '../models/Team';


class TeamController {
  async store(req, res) {
    const team = await Team.create(req.body);

    return res.json(team);
  }


}

export default new TeamController();