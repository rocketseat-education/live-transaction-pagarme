import { Stock } from '../models';

class StockController {
  async show(req, res) {
    const { id } = req.params;

    const stock = await Stock.find(id);

    return res.json(stock.toJSON());
  }
}

export default new StockController();
