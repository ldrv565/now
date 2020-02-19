import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { bg, human, humanWait } from 'public/images';
import { track } from 'public/sounds';

export default () => {
  const container = useRef();
  const audioPlayer = useRef();
  const [width, setWidth] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    container.current.focus();

    const currentWidth = container.current.childNodes[1].offsetWidth;

    setTimeout(() => audioPlayer.current.play(), 500);
    setWidth(currentWidth);
    setStep(currentWidth / 10);
  }, []);

  const [position, setPosition] = useState(0);
  const [src, setSrc] = useState(humanWait);
  const [isStoped, setStoped] = useState(true);

  const [timer, setTimer] = useState();

  const go = direction => {
    setSrc(human);

    if (direction === 'left') {
      setPosition(prevPosition =>
        prevPosition > step ? prevPosition - step : 0
      );
    }

    if (direction === 'right') {
      setPosition(prevPosition =>
        prevPosition < width - step ? prevPosition + step : width - step
      );
    }
  };

  const stop = () => {
    setStoped(true);
    clearInterval(timer);
    setSrc(humanWait);
  };

  const [isGoLeft, setGoLeft] = useState(false);

  const goLeft = () => {
    if (isStoped) {
      setStoped(false);
      setTimer(setInterval(() => go('left'), 200));
      setGoLeft(true);
    }
  };

  const goRight = () => {
    if (isStoped) {
      setStoped(false);
      setTimer(setInterval(() => go('right'), 200));
      setGoLeft(false);
    }
  };

  const onKeyDown = e => {
    if (e.key === 'ArrowLeft') {
      goLeft();
    }

    if (e.key === 'ArrowRight') {
      goRight();
    }

    // ArrowUp
  };

  return (
    <>
      <Container
        tabIndex={0}
        ref={container}
        onKeyDown={onKeyDown}
        onKeyUp={stop}
      >
        <Button
          onMouseDown={goLeft}
          onMouseUp={stop}
          onTouchStart={goLeft}
          onTouchEnd={stop}
        />
        <Main>
          <Background src={bg} width={width} alt="bg" />
          <Content>
            <Human
              isGoLeft={isGoLeft}
              src={src}
              alt="human"
              position={position}
              width={width / 10}
            />
          </Content>
        </Main>
        <Button
          right
          onMouseDown={goRight}
          onMouseUp={stop}
          onTouchStart={goRight}
          onTouchEnd={stop}
        />
      </Container>

      <audio ref={audioPlayer} loop autoPlay="autoplay" src={track}>
        <track kind="captions" />
      </audio>
    </>
  );
};

const Container = styled.div`
  display: flex;
  background-color: black;
  outline: none;
  user-select: none;
`;

const Main = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  @media (max-width: 500px) {
    width: 100vw;
  }
  margin: auto;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-end;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Background = styled.img`
  height: 100%;
  width: auto;
  font-size: 0;
  image-rendering: pixelated;

  @media (max-width: 500px) {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
`;

const Button = styled.button`
  position: absolute;
  left: ${({ right }) => (right ? 'auto' : 0)};
  right: ${({ right }) => (right ? 0 : 'auto')};
  z-index: 1;
  opacity: 0;
  width: 50%;
  height: 100vh;
`;

const Human = styled.img`
  image-rendering: pixelated;
  margin-left: ${({ position }) => position}px;
  transform: scale(${({ isGoLeft }) => (isGoLeft ? -1 : 1)}, 1);
  width: ${({ width }) => width};

  transition: width 2s cubic-bezier(0.86, 0, 0.07, 1);
  transition: margin-left 0.2s ease-out;
`;
