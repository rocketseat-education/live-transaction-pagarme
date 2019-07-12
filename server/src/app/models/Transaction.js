import { Model } from './Lucid';

class Transaction extends Model {
  checkout() {
    this.belongsTo('model:Checkout');
  }
}

export default Transaction;
