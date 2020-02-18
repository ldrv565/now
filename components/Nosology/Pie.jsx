import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Pie = ({
  isActive,
  index,
  title,
  count,
  diff,
  value,
  offset,
  height,
  color,
  ...restProps
}) => {
  const angle = value * 2 * Math.PI;

  const lineAngle = 90 + offset + (value * 360) / 2;

  const x = Math.cos(angle) * 100;
  const y = Math.sin(angle) * 100;

  const firstPoint = (value > 0.25 && [0, 100]) ||
    (value > 0 && [x, y]) || [0, 0];
  const secondPoint =
    (value > 0.5 && [-100, 0]) || (value > 0.25 && [x, y]) || firstPoint;
  const thirdPoint =
    (value > 0.75 && [0, -100]) || (value > 0.5 && [x, y]) || secondPoint;
  const fourthPoint = value > 0.75 ? [x, y] : thirdPoint;

  const c = [firstPoint, secondPoint, thirdPoint, fourthPoint];

  return (
    <>
      <Container
        isActive={isActive}
        color={color}
        offset={offset}
        {...restProps}
      >
        <Part isActive={isActive} c={c} height={height}>
          <Circle color={color} />
        </Part>
      </Container>
      <LineContainer lineAngle={lineAngle} {...restProps}>
        <Line
          isActive={isActive}
          color={color}
          index={index}
          height={height}
          diff={diff}
        >
          <LabelContainer color={color} lineAngle={lineAngle}>
            <Label color={color} lineAngle={lineAngle}>
              <Text isActive={isActive} color={color}>
                <div>{title}</div>
                <div>{count} чел.</div>
              </Text>
            </Label>
          </LabelContainer>
        </Line>
      </LineContainer>
    </>
  );
};

Pie.propTypes = {
  isActive: PropTypes.bool,
  index: PropTypes.number,
  title: PropTypes.string,
  diff: PropTypes.number,
  count: PropTypes.number,
  value: PropTypes.number,
  offset: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.array
};

export default Pie;

const Container = styled.div`
  position: absolute;
  top: 43.75%;
  left: 43.75%;
  width: 12.5%;
  height: 12.5%;
  z-index: ${({ isActive }) => +isActive};

  transform: scale(1, -1) rotate(${({ offset }) => 90 + offset}deg);

  filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.25));
`;

const Part = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ height }) => 8 * height}%;
  height: ${({ height }) => 8 * height}%;
  cursor: pointer;

  transition: 0.125s;

  ${({ isActive }) =>
    isActive &&
    css`
      width: 820%;
      height: 820%;
    `}

  margin-top: 50%;
  margin-left: 50%;

  clip-path: polygon(
    0 0,
    100% 0,
    ${({ c }) => `
      ${c[0][0]}% ${c[0][1]}%,
      ${c[1][0]}% ${c[1][1]}%,
      ${c[2][0]}% ${c[2][1]}%,
      ${c[3][0]}% ${c[3][1]}%
    `}
  );
`;

const Circle = styled.div`
  position: absolute;
  background: rgb(
    ${({ color }) => color[0]},
    ${({ color }) => color[1]},
    ${({ color }) => color[2]}
  );

  border-radius: 100%;

  margin-left: -50%;
  margin-top: -50%;

  height: 100%;
  width: 100%;
  z-index: 1;
`;

const LineContainer = styled.div`
  position: absolute;
  top: 43.75%;
  left: 43.75%;
  width: 12.5%;
  height: 12.5%;

  transform: scale(1, -1) rotate(${({ lineAngle }) => lineAngle}deg);
`;

const Line = styled.div`
  position: absolute;
  width: calc(
    ${({ height }) => height / 2}% + ${({ diff }) => (diff ? diff * 22 : 0)}px
  );
  height: 1px;
  bottom: 50%;
  left: calc(
    ${({ isActive, height }) =>
        (800 + -+!isActive * (800 - height * 8) + isActive * 10) / 2}% + 40px
  );

  @media (max-width: 700px) {
    left: calc(
      ${({ isActive, height }) =>
          (800 + -+!isActive * (800 - height * 8) + isActive * 10) / 2}% + 20px
    );
  }

  transition: 0.125s;

  background: rgb(
    ${({ color }) => color[0]},
    ${({ color }) => color[1]},
    ${({ color }) => color[2]}
  );
`;

const LabelContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  transform: rotate(${({ lineAngle }) => -lineAngle}deg);

  background: rgb(
    ${({ color }) => color[0]},
    ${({ color }) => color[1]},
    ${({ color }) => color[2]}
  );
`;

const Label = styled.div`
  position: absolute;
  left: ${({ lineAngle }) => (lineAngle - 90 > 180 ? 0 : 'auto')};
  right: ${({ lineAngle }) => (lineAngle - 90 < 180 ? 0 : 'auto')};
  bottom: 0;
  cursor: pointer;

  background: linear-gradient(
    ${({ lineAngle }) => (lineAngle - 90 >= 180 ? 'to right' : 'to left')},
    rgb(
      ${({ color }) => color[0]},
      ${({ color }) => color[1]},
      ${({ color }) => color[2]}
    ),
    transparent
  );

  width: 150px;
  height: 1px;

  @media (max-width: 700px) {
    width: 20vw;
  }
`;

const Text = styled.div`
  position: absolute;
  top: -1.6rem;
  left: 0;
  width: 100%;
  text-align: center;
  transform: scale(1, -1);
  white-space: nowrap;

  font-size: 1.4rem;

  & > div {
    &:first-child {
      color: gray;
      ${({ isActive }) =>
        isActive &&
        css`
          color: rgb(
            ${({ color }) => color[0]},
            ${({ color }) => color[1]},
            ${({ color }) => color[2]}
          );

          font-weight: 600;
        `};
    }

    &:last-child {
      color: black;
      ${({ isActive }) =>
        isActive &&
        css`
          color: rgb(
            ${({ color }) => color[0]},
            ${({ color }) => color[1]},
            ${({ color }) => color[2]}
          );

          font-weight: 600;
        `};
    }
  }
`;
