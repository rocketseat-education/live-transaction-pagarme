import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 30px;
  background: #444444;
  border-radius: 4px;

  footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7159c1')};
      }
    }
  }
`;

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: #ededee;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #4c4b4f;
  }

  img {
    height: 100px;
  }

  strong {
    color: #e0e0e0;
    display: block;
  }

  span {
    color: #fff;
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 6px;
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 28px;
    margin-left: 5px;
    color: #fff;
  }
`;

export const CheckoutButton = styled.div`
  display: flex;

  justify-content: flex-start;
  margin-top: 50px;

  .checkout-button {
    width: 200px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    background: #7159c1;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    &:hover {
      background: ${darken(0.03, '#7159c1')};
    }
  }
`;

export const Address = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 20px;

  h3 {
    color: #ffffff;
    margin-top: 25px;
    margin-bottom: 25px;
    text-align: center;
  }

  label {
    display: block;
    color: #87868b;
    font-size: 14px;
    font-weight: bold;
  }

  input {
    width: 100%;
    background: #19181f;
    border: 2px solid #25242c;
    border-radius: 5px;
    padding: 15px 21px;
    margin-top: 8px;
    font-size: 14px;
    margin-bottom: 15px;
    color: #ffffff;
  }
`;

export const PaymentTitle = styled.h3`
  color: #ffffff;
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: center;
`;

export const Payment = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 20px;
  grid-template-areas:
    'header header'
    'header header'
    'main sidebar';

  .cards {
    grid-area: header;
  }

  .save-card {
    display: flex;

    align-items: center;
    justify-content: flex-start;
    padding: 10px 0;
    font-size: 13px;
    color: #ffffff;

    input {
      margin-right: 5px;
    }
  }

  .form-area {
    grid-area: main;
    & > label,
    div.group label {
      display: block;
      color: #87868b;
      font-size: 14px;
      font-weight: bold;
    }

    & > input,
    div.group input {
      width: 100%;
      background: #19181f;
      border: 2px solid #25242c;
      border-radius: 5px;
      padding: 15px 21px;
      margin-top: 8px;
      font-size: 14px;
      margin-bottom: 15px;
      color: #ffffff;
    }

    .group {
      width: 100%;
      display: grid;
      grid-template-columns: auto auto;
      grid-column-gap: 20px;

      div {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .credit-card {
    display: flex;
    align-items: center;
    grid-area: sidebar;
  }
`;

const loadingAnimation = keyframes`
  0%, 100% {
    transform: scale(0.0);
  }

  50% {
    transform: scale(1.0);
  }
}`;

export const Loading = styled.span`
  width: 20px;
  height: 20px;
  position: relative;

  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.3;
    position: absolute;
    top: 0;
    left: 0;

    animation: ${loadingAnimation} 2s infinite ease-in-out;
  }

  &::after {
    animation-delay: -1s;
  }
`;
