import React from 'react';
import styled from 'styled-components';

import { Nosology } from '../components';

export default () => (
  <Container>
    <Content>
      <Nosology
        values={[
          {
            title: 'Кровообращение',
            count: 145,
            color: [254, 106, 156],
            diff: 12
          },
          {
            title: 'Обмен веществ',
            count: 120,
            color: [23, 201, 195],
            diff: 12
          },
          {
            title: 'Пищеварение',
            count: 100,
            color: [117, 231, 128],
            diff: 12
          },
          {
            title: 'Органы дыхания',
            count: 74,
            color: [39, 126, 234],
            diff: 12
          },
          {
            title: 'Мочеполовая',
            count: 66,
            color: [243, 197, 133],
            diff: -2
          },
          {
            title: 'Костно-мышечная',
            count: 45,
            color: [176, 176, 176],
            diff: 12
          }
        ]}
      />
    </Content>
  </Container>
);

const Container = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 24px;
`;
