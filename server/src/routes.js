import { Router } from 'express';

import ProductController from './app/controllers/ProductController';
import StockController from './app/controllers/StockController';
import CheckoutController from './app/controllers/CheckoutController';
import CardController from './app/controllers/CardController';
import TransactionController from './app/controllers/TransactionController';

const routes = new Router();

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);

routes.get('/cards', CardController.index);

routes.post('/checkouts', CheckoutController.store);
routes.get('/checkouts/:id', CheckoutController.show);

routes.get('/stocks/:id', StockController.show);

routes.delete('/transactions/:id', TransactionController.destroy);

export default routes;
