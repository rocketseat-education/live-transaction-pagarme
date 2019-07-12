import { Product } from '../models';

class ProductController {
  async index(req, res) {
    const products = await Product.all();

    return res.json(products.toJSON());
  }

  async show(req, res) {
    const { id } = req.params;

    const product = await Product.find(id);

    return res.json(product.toJSON());
  }
}

export default new ProductController();
