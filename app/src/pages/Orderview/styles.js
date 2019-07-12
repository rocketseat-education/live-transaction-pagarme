import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 30px;
  background: #444444;
  border-radius: 4px;
  color: #fff;

  table {
    width: 100%;
    margin-bottom: 25px;

    thead {
      tr {
        th {
          text-align: left;
        }
      }
    }
    tbody {
      tr {
        td {
          img {
            width: 140px;
          }
        }
      }
    }
  }
`;
