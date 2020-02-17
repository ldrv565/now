import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { PeopleUpIcon, PeopleDownIcon } from 'static/icons';

import Pie from './Pie';

import { ListWidget } from '../common';

const angle = value => value * 360;

const Nosology = ({ values }) => {
  const sum = values.reduce((acc, currentValue) => acc + currentValue.count, 0);

  const sortedValues = values.sort((a, b) => b.count - a.count);

  const percents = sortedValues.map(value => value.count / sum);

  const diffs = [];
  percents.forEach((percent, index) => {
    if (percent > 0.07) {
      return diffs.push(0);
    }

    if (diffs[index - 1]) {
      return diffs.push(diffs[index - 1] + 1);
    }

    return diffs.push(1);
  });

  const [selectedPart, setSelectedPart] = useState(null);

  return (
    <ListWidgetStyled title="Диспансерный учет по нозологиям">
      <Container>
        <BoxContainer>
          <Box>
            {percents.map((value, index) => {
              const offset = angle(
                percents
                  .slice(0, index)
                  .reduce((acc, currentValue) => acc + currentValue, 0)
              );

              const height = 100 - (offset * 40) / 360;

              return (
                <Pie
                  key={values[index].title}
                  index={index}
                  title={values[index].title}
                  count={values[index].count}
                  value={value}
                  offset={offset}
                  height={height}
                  color={values[index].color}
                  diff={diffs[index]}
                  selectedPart={selectedPart}
                  onFocus={() => setSelectedPart(values[index].title)}
                  onMouseOver={() => setSelectedPart(values[index].title)}
                  onMouseLeave={() => setSelectedPart(null)}
                  isActive={values[index].title === selectedPart}
                />
              );
            })}

            <Circle>
              <PatientsCount>{sum}</PatientsCount>
              <div>Пациентов на учете</div>
            </Circle>
          </Box>
        </BoxContainer>

        <ListContainer>
          {sortedValues.map(value => (
            <ListItem
              color={value.color}
              isActive={value.title === selectedPart}
              onMouseLeave={() => setSelectedPart(null)}
              onFocus={() => setSelectedPart(value.title)}
              onMouseOver={() => setSelectedPart(value.title)}
            >
              <Icon color={value.color} />
              <ListItemContent>
                <div>{value.title}</div>

                <ListItemValue>
                  <Diff diff={value.diff}>
                    ({value.diff > 0 ? `+${value.diff}` : value.diff})
                  </Diff>

                  <div>{value.count}</div>

                  <PeopleIconContainer>
                    {value.diff > 0 ? <PeopleUpIcon /> : <PeopleDownIcon />}
                  </PeopleIconContainer>
                </ListItemValue>
              </ListItemContent>
            </ListItem>
          ))}
        </ListContainer>
      </Container>
    </ListWidgetStyled>
  );
};

Nosology.propTypes = {
  values: PropTypes.array
};

export default Nosology;

const ListWidgetStyled = styled(ListWidget)`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: center;

  margin: 48px;
  margin-left: 145px;
  margin-right: 200px;
  flex: 1 0 300px;
`;

const Box = styled.div`
  position: relative;

  width: 300px;
  height: 300px;
`;

const Circle = styled.div`
  position: absolute;
  top: 25%;
  left: 25%;

  width: 50%;
  height: 50%;
  z-index: 2;

  border-radius: 100%;

  background: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);

  font-size: 1.2rem;

  color: gray;
`;

const PatientsCount = styled.div`
  font-size: 32px;
  color: black;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 350px;
  border-left: 1px solid gray;
`;

const Icon = styled.div`
  width: 8px;
  height: 8px;
  margin-right: 16px;
  transform: rotate(45deg);
  background: rgb(
    ${({ color }) => color[0]},
    ${({ color }) => color[1]},
    ${({ color }) => color[2]}
  );
`;

const ListItem = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 1.6rem;

  font-weight: 500;
  cursor: pointer;

  padding: 0 16px;

  ${({ isActive }) =>
    isActive &&
    css`
      color: rgb(
        ${({ color }) => color[0]},
        ${({ color }) => color[1]},
        ${({ color }) => color[2]}
      );

      background: rgb(244, 244, 244);

      ${Icon} {
        box-shadow: 0px 0px 12px
          rgba(
            ${({ color }) => color[0]},
            ${({ color }) => color[1]},
            ${({ color }) => color[2]},
            0.7
          );
      }
    `}
`;

const ListItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(244, 244, 244);
  flex: 1;
  height: calc(100% - 32px);
  padding: 16px 0;
`;

const ListItemValue = styled.div`
  display: flex;
  padding-left: 32px;
  font-weight: 500;
  color: black;
`;

const Diff = styled.div`
  color: ${({ diff }) => (diff > 0 ? 'green' : 'red')};
  padding-right: 8px;
`;

const PeopleIconContainer = styled.div`
  padding-left: 8px;
`;
