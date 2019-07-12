import pagarme from 'pagarme';
import { Checkout, CreditCard, Transaction } from '../models';

class CheckoutController {
  async store(req, res) {
    const {
      address,
      customer,
      card_hash,
      items,
      installments,
      amount: amountClient,
      save_card,
      card_id,
    } = req.body;

    try {
      let card;
      if (card_id) {
        card = await CreditCard.findOrFail(card_id);
      }

      const client = await pagarme.client.connect({
        api_key: process.env.PAGARME_API_KEY,
      });

      const fee = 1000;

      const amount = amountClient * 100 + fee;

      const pagarmeTransaction = await client.transactions.create({
        amount: parseInt(amount, 10),
        ...(card_hash ? { card_hash } : { card_id: card.card_id }),
        customer: {
          name: customer.name,
          email: customer.email,
          country: 'br',
          external_id: '1',
          type: 'individual',
          documents: [
            {
              type: 'cpf',
              number: customer.cpf,
            },
            {
              type: 'rg',
              number: customer.rg,
            },
          ],
          phone_numbers: [customer.phone],
        },
        billing: {
          name: customer.name,
          address: {
            ...address,
            country: 'br',
          },
        },
        shipping: {
          name: customer.name,
          fee,
          delivery_date: '2019-07-21',
          expedited: false,
          address: {
            ...address,
            country: 'br',
          },
        },
        items: items.map(item => ({
          id: String(item.id),
          title: item.title,
          unit_price: parseInt(item.price * 100, 10),
          quantity: item.amount,
          tangible: true,
        })),
      });

      if (save_card && !card) {
        const { card } = pagarmeTransaction;

        await CreditCard.findOrCreate({
          card_id: card.id,
          number: `${card.first_digits}*********${card.last_digits}`,
          holder_name: card.holder_name,
          brand: card.brand,
          expiration_date: card.expiration_date,
        });
      }

      const checkout = await Checkout.create({
        amount: parseInt(amount * 100, 10),
        fee,
      });

      await checkout.products().attach(items.map(item => item.id), row => {
        const product = items.find(item => item.id === row.product_id);
        row.amount = product.amount;
        row.total = product.price * product.amount * 100;
      });

      const transactions = await Transaction.create({
        checkout_id: checkout.id,
        transaction_id: pagarmeTransaction.id,
        status: pagarmeTransaction.status,
        authorization_code: pagarmeTransaction.authorization_code,
        brand: pagarmeTransaction.card.brand,
        authorized_amount: pagarmeTransaction.authorized_amount,
        tid: pagarmeTransaction.tid,
        installments,
      });

      return res.json(transactions.toJSON());
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async show(req, res) {
    const { id } = req.params;

    const checkout = await Checkout.find(id);
    await checkout.loadMany(['transaction', 'products']);

    return res.json(checkout.toJSON());
  }
}

export default new CheckoutController();
