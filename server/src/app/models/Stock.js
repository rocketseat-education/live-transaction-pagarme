import { Model } from './Lucid';

class Stock extends Model {
  product() {
    return this.belongsTo('model:Product');
  }
}

export default Stock;
