import pagarme from 'pagarme';
import React, { useState } from 'react';
import { Form, Input, Scope } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';

import api from '../../services/api';
import showError from '../../services/error';

import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import CreditCard from './CreditCard';

import initialFormData from './data';

import {
  Container,
  ProductTable,
  Total,
  Address,
  PaymentTitle,
  Payment,
  CheckoutButton,
  Loading,
} from './styles';

export default function Cart() {
  const totalRaw = useSelector(state =>
    state.cart.reduce((totalSum, product) => {
      return totalSum + product.price * product.amount;
    }, 0)
  );

  const total = formatPrice(totalRaw);

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [data, setData] = useState(initialFormData);
  const [installments, setInstallments] = useState(1);

  const [card, setCard] = useState({
    holder_name: '',
    number: '',
    expiration_date: '',
    cvv: '',
    id: '',
  });

  async function handleSubmit(formData) {
    setLoading(true);

    const { card: cardForm } = formData;

    delete formData.card;

    try {
      let cardData = card.id;

      if (!card.id) {
        const client = await pagarme.client.connect({
          encryption_key: process.env.REACT_APP_PAGARME_ENCRYPTION_KEY,
        });
        cardData = await client.security.encrypt(cardForm);
      }

      await api.post('checkouts', {
        ...formData,
        installments,
        items: cart,
        amount: totalRaw,
        save_card: saveCard,
        ...(card.id ? { card_id: cardData } : { card_hash: cardData }),
      });
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  }

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function handleChangeCard(e) {
    const name = e.target.name.split('.')[1].replace(/card_/, '');
    const { value } = e.target;

    setCard({ ...card, [name]: value, id: '' });
  }

  function handleSelectCard({ id, holder_name, number, expiration_date }) {
    setData({
      ...data,
      card: {
        card_holder_name: holder_name,
        card_number: number,
        card_expiration_date: expiration_date,
        card_cvv: '',
      },
    });

    setCard({
      holder_name,
      number,
      expiration_date,
      cvv: '',
      id,
    });
  }

  function renderInstallments() {
    return [...new Array(4)].map((item, idx) => {
      const installment = idx + 1;
      return (
        <option value={installment}>{`${installment} x ${formatPrice(
          totalRaw / installment
        )}`}</option>
      );
    });
  }

  return (
    <>
      <Container>
        <ProductTable>
          <thead>
            <tr>
              <th />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <tr>
                <td>
                  <img src={product.image} alt={product.title} />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button type="button" onClick={() => decrement(product)}>
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>
                    <input type="number" readOnly value={product.amount} />
                    <button type="button" onClick={() => increment(product)}>
                      <MdAddCircleOutline size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.subtotal}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(CartActions.removeFromCart(product.id))
                    }
                  >
                    <MdDelete size={20} color="#7159c1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>

        <footer>
          <select onChange={e => setInstallments(e.target.value)}>
            {renderInstallments()}
          </select>

          <Total>
            <span>TOTAL</span>
            <strong>{total}</strong>
          </Total>
        </footer>
      </Container>
      <Form onSubmit={handleSubmit} initialData={data}>
        <Address>
          <div>
            <h3>Informações pessoais</h3>
            <Scope path="customer">
              <Input name="name" label="Nome" />
              <Input name="email" label="E-mail" />
              <Input name="cpf" label="CPF" />
              <Input name="rg" label="RG" />
              <Input name="phone" label="Celular" />
              <Input name="birthday" label="Data de aniversário" />
            </Scope>
          </div>
          <div>
            <h3>Endereço</h3>
            <Scope path="address">
              <Input name="zipcode" label="CEP" />
              <Input name="street" label="Logradouro" />
              <Input name="street_number" label="Número" />
              <Input name="neighborhood" label="Bairro" />
              <Input name="city" label="Cidade" />
              <Input name="state" label="Estado" />
            </Scope>
          </div>
        </Address>
        <PaymentTitle>Dados bancários</PaymentTitle>
        <Payment>
          <div className="cards">
            <CreditCard onChange={handleSelectCard} />
          </div>
          <div className="form-area">
            <Scope path="card">
              <Input
                name="card_holder_name"
                label="Nome no cartão"
                onChange={handleChangeCard}
              />
              <Input
                name="card_number"
                label="Número do cartão"
                onChange={handleChangeCard}
              />
              <div className="group">
                <div>
                  <Input
                    name="card_expiration_date"
                    label="Data de expiração"
                    onChange={handleChangeCard}
                  />
                </div>
                <div>
                  <Input
                    name="card_cvv"
                    label="Código de segurança"
                    onChange={handleChangeCard}
                  />
                </div>
              </div>
              <div className="save-card">
                <input
                  type="checkbox"
                  name="save_card"
                  id="save-card"
                  checked={saveCard}
                  onChange={e => setSaveCard(e.target.checked)}
                />
                <label htmlFor="save-card">
                  Salvar cartão de crédito para a próxima compra
                </label>
              </div>
            </Scope>
          </div>
          <div className="credit-card">
            <Cards
              number={card.number}
              name={card.holder_name}
              expiry={card.expiration_date}
              cvc={card.cvv}
              focused="number"
            />
          </div>
        </Payment>
        <CheckoutButton>
          <button type="submit" className="checkout-button">
            {loading ? <Loading /> : `Finalizar pagamento`}
          </button>
        </CheckoutButton>
      </Form>
    </>
  );
}
