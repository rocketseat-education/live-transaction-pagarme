import { Models } from './Lucid';

import TransactionModel from './Transaction';
import CreditCardModel from './CreditCard';
import ProductModel from './Product';
import StockModel from './Stock';
import CheckoutModel from './Checkout';

Models.add('Transaction', TransactionModel);
Models.add('CreditCard', CreditCardModel);
Models.add('Product', ProductModel);
Models.add('Stock', StockModel);
Models.add('Checkout', CheckoutModel);

export const Transaction = Models.get('Transaction');
export const CreditCard = Models.get('CreditCard');
export const Product = Models.get('Product');
export const Stock = Models.get('Stock');
export const Checkout = Models.get('Checkout');
