import React, { useState, useEffect } from 'react';

import { Container } from './styles';

import api from '../../services/api';
import { formatPrice } from '../../util/format';

export default function Orderview({ match }) {
  const [checkout, setCheckout] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get(`checkouts/${match.params.id}`);
        setCheckout(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [match]);

  function renderItems() {
    return checkout.products.map(product => (
      <tr key={product.id}>
        <td>
          <img src={product.image} alt={product.title} />
        </td>
        <td>{product.title}</td>
        <td>{product.pivot.amount}</td>
        <td>{formatPrice(product.price)}</td>
        <td>{formatPrice(product.pivot.total / 100)}</td>
      </tr>
    ));
  }

  function disable() {
    return !['processing', 'authorized', 'paid'].includes(
      checkout.transaction.status
    );
  }

  async function handleRefund() {
    try {
      await api.delete(`transactions/${checkout.transaction.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    !loading && (
      <Container>
        <h3>Pedido</h3>
        <table>
          <thead>
            <tr>
              <th />
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor do produto</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>{renderItems()}</tbody>
          <tfoot>
            <tr>
              <th>Subtotal</th>
              <td>{formatPrice((checkout.amount - checkout.fee) / 100)}</td>
            </tr>
            <tr>
              <th>Frete</th>
              <td>{formatPrice(checkout.fee / 100)}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{formatPrice(checkout.amount / 100)}</td>
            </tr>
          </tfoot>
        </table>
        <table>
          <thead>
            <tr>
              <th>{checkout.transaction.brand}</th>
              <th>N da autorização</th>
              <th>N transação</th>
              <th>Valor autorizado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td>{checkout.transaction.authorization_code}</td>
              <td>{checkout.transaction.tid}</td>
              <td>{checkout.transaction.authorized_amount}</td>
            </tr>
          </tbody>
        </table>
        <button type="button" onClick={handleRefund} disabled={disable()}>
          Cancelar pedido
        </button>
      </Container>
    )
  );
}
