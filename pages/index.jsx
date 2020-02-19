import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { bg, human, humanWait } from 'public/images';
import { track } from 'public/sounds';

const STEP = 5;

export default () => {
  const container = useRef();
  const audioPlayer = useRef();
  const [width, setWidth] = useState(100);
  useEffect(() => {
    container.current.focus();
    setTimeout(() => audioPlayer.current.play(), 500);
    setWidth(container.current.childNodes[0].offsetWidth);
  }, []);

  const [position, setPosition] = useState(0);
  const [src, setSrc] = useState(humanWait);
  const go = () => setSrc(human);
  const stop = () => setSrc(humanWait);

  const [isGoLeft, setGoLeft] = useState(false);

  const goLeft = () => {
    if (position > 0) {
      setPosition(position - STEP);
    }

    setGoLeft(true);
  };

  const goRight = () => {
    if (position < width * 0.9) {
      setPosition(position + STEP);
    }
    setGoLeft(false);
  };

  const onKeyDown = e => {
    if (e.key === 'ArrowLeft') {
      go();
      goLeft();
    }

    if (e.key === 'ArrowRight') {
      go();
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
        <Main>
          <Background src={bg} alt="bg" />
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
  justify-content: center;
  outline: none;
`;

const Main = styled.div`
  position: relative;
  height: 100vh;
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
  font-size: 0;
  image-rendering: pixelated;
`;

const Human = styled.img`
  image-rendering: pixelated;
  margin-left: ${({ position }) => position}px;
  transform: scale(${({ isGoLeft }) => (isGoLeft ? -1 : 1)}, 1);
  width: ${({ width }) => width};

  transition: width 2s cubic-bezier(0.86, 0, 0.07, 1);
`;
