import { Model } from './Lucid';

class Checkout extends Model {
  transaction() {
    return this.hasOne('model:Transaction');
  }

  products() {
    return this.belongsToMany('model:Product')
      .withTimestamps()
      .withPivot(['amount', 'total']);
  }
}

export default Checkout;
