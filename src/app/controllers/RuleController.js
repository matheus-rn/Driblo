import Rule from '../models/Rule';

class RuleController {
  async store(req, res) {
    const team = await Rule.create(req.body);

    return res.json(team);
  }

  async index(req, res) {
    const ruleExists = await Rule.findAll({
      where: { pelada_id: req.params.peladaId },
    });

    if (!ruleExists) {
      return res.status(400).json({ error: 'Regra não existe' });
    }

    return res.status(200).json(ruleExists);
  }

  async update(req, res) {
    const ruleExists = await Rule.findOne({ where: { id: req.params.id } });

    if (!ruleExists) {
      return res.status(400).json({ error: 'Usuário não existente' });
    }

    const update_rule = await ruleExists.update(req.body);

    return res.json(update_rule);
  }

  async destroy(req, res) {
    const ruleExists = await Rule.findOne({ where: { id: req.params.id } });

    if (!ruleExists) {
      return res.status(400).json({ error: 'Regra não existente' });
    }

    const delete_rule = await Rule.destroy({ where: { id: req.params.id } });

    return res.json({ delete_rule });
  }
}

export default new RuleController();
