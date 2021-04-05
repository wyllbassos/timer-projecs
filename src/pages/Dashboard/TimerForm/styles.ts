import styled from 'styled-components';
import { Col } from 'antd';

export const Container = styled.div`
  width: 100%;
  background: #fff;
  border: 1px solid #f0f0f0;
  padding: 24px;
  border-radius: 2px;
  /* margin: 0 24px; */
`;

export const TaskDescriptionContainer = styled.div<{ isModal: boolean }>`
  display: grid;
  grid-template-columns: ${(props): string =>
    props.isModal ? '1fr' : '2fr 2fr 1fr'};
  /* grid-template-rows: 1fr 1fr 1fr; */
  grid-gap: 16px;
  width: 100%;
  margin-bottom: 16px;

  @media (max-width: 670px) {
    grid-template-columns: ${(props): string =>
      props.isModal ? '1fr' : '1fr 1fr 1fr'};
  }
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

export const TaskDateTimeContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 3fr 1fr 10fr;
  grid-gap: 16px;
  width: 100%;
  align-items: center;

  @media (max-width: 1000px) {
    grid-template-columns: 3fr 3fr 3fr 1fr 6fr;
  }
  @media (max-width: 830px) {
    grid-template-columns: 3fr 3fr 3fr 1fr 2fr;
  }
  @media (max-width: 670px) {
    grid-template-columns: 3fr 3fr 3fr 1fr;
  }
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }

  button {
    line-height: 0;
    padding: 0;
    margin: 0;
  }
`;
