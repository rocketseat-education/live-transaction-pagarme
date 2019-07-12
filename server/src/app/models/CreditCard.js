import { Model } from './Lucid';

class CreditCard extends Model {
  static get hidden() {
    return ['credit_id'];
  }
}

export default CreditCard;
