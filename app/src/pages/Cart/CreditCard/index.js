import React, { useState, useEffect } from 'react';

import { MdCheck } from 'react-icons/md';
import { Container, Title } from './styles';

import api from '../../../services/api';

import Visa from '../../../assets/images/visa.png';
import MasterCard from '../../../assets/images/mastercard.png';
import CreditCard from '../../../assets/images/creditcard.png';

function CreditCards({ onChange }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get('cards');
        setCards(data);
      } catch (err) {}
    }

    load();
  }, []);

  function brandImage(brand) {
    switch (brand) {
      case 'visa':
        return Visa;
      case 'mastercard':
      case 'master-card':
        return MasterCard;
      default:
        return CreditCard;
    }
  }

  function handleChange(card) {
    onChange(card);
  }

  function renderCards() {
    return (
      cards.length && (
        <>
          <Title>Utilizar cartões salvos</Title>
          <Container>
            {cards.map(card => (
              <li className="card" key={card.id}>
                <input
                  id={`card${card.id}`}
                  type="radio"
                  name="card"
                  value={card.id}
                  onChange={() => handleChange(card)}
                />
                <label htmlFor={`card${card.id}`}>
                  <div className="check">
                    <MdCheck size={15} />
                  </div>
                  {card.number}
                  <img src={brandImage(card.brand)} alt={card.brand} />
                  <b>{card.holder_name}</b>
                </label>
              </li>
            ))}
          </Container>
        </>
      )
    );
  }

  return renderCards() || null;
}

export default CreditCards;
