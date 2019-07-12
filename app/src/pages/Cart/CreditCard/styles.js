import styled from 'styled-components';

export const Container = styled.ul`
  padding: 0;
  margin: 0;
  margin-bottom: 25px;
  list-style: none;
  color: #87868b;
  border: 2px solid #3e3d45;

  li.card {
    background: #3e3d45;

    & input[type='radio'] {
      display: none;
    }

    & label {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 15px 10px;
      margin: 0;

      font-size: 14px;

      img {
        width: 25px;
        margin-left: 15px;
        margin-right: 15px;
      }

      .check {
        width: 23px;
        height: 23px;
        margin-right: 15px;
        border-radius: 50%;
        border: 2px solid #dadcdc;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          display: none;
          fill: #fff;
        }
      }
    }

    & input[type='radio']:checked + label {
      background: #fff;
      div.check {
        background: #59b949;
        border-color: #59b949;

        svg {
          display: block;
        }
      }
    }
  }
`;

export const Title = styled.p`
  margin-bottom: 10px;
  font-size: 15px;
  color: #fff;
`;
