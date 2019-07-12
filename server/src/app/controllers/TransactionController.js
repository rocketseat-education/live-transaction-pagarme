import pagarme from 'pagarme';
import { Transaction } from '../models';

class TransactionController {
  async destroy(req, res) {
    const { id } = req.params;
    try {
      const transaction = await Transaction.find(id);

      const client = await pagarme.client.connect({
        api_key: process.env.PAGARME_API_KEY,
      });

      await client.transactions.refund({
        id: transaction.transaction_id,
      });

      transaction.merge({
        status: 'refund',
      });

      await transaction.save();

      return res.json(transaction);
    } catch (err) {
      return res.status(500).json({});
    }
  }
}

export default new TransactionController();
