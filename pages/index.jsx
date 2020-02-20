import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { bg, human, humanWait } from 'public/images';
import { track, track2 } from 'public/sounds';

const FRAME = 1000 / 15;
const JUMP_FRAME = FRAME * 6;
const BOTTOM = 10;
const humanWidth = 20;
const step = humanWidth / 4;

const trackLength = 22600;

export default () => {
  const container = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    container.current.focus();
    const currentWidth = container.current.childNodes[1].offsetWidth;
    setWidth(currentWidth);
  }, []);

  const [hasInteracted, setInteracted] = useState(false);
  const audioPlayer = useRef();
  const audioPlayer2 = useRef();

  useEffect(() => {
    if (hasInteracted && audioPlayer.current && audioPlayer2.current) {
      audioPlayer.current.play();
      setInterval(() => audioPlayer.current.play(), trackLength * 2);
      setTimeout(() => {
        audioPlayer2.current.play();
        setInterval(() => audioPlayer2.current.play(), trackLength * 2);
      }, trackLength);
    }
  }, [hasInteracted, audioPlayer.current, audioPlayer2.current]);

  const [position, setPosition] = useState({ x: 0, y: BOTTOM });

  const map = useRef();

  const [src, setSrc] = useState(humanWait);
  const [isStoped, setStoped] = useState(true);
  const [isJumping, setJumping] = useState(false);

  const [timer, setTimer] = useState();
  const [jumpTimer, setJumpTimer] = useState();

  const go = direction => {
    if (direction === 'left') {
      setPosition(({ x, y }) => ({ x: x > step ? x - step : 0, y }));
    }

    if (direction === 'right') {
      setPosition(({ x, y }) => ({
        x: x <= width - step - humanWidth ? x + step : width - humanWidth,
        y
      }));
    }

    if (direction === 'top') {
      setPosition(({ x, y }) => ({
        x,
        y: y + step * 4
      }));
    }

    if (direction === 'bottom') {
      setPosition(({ x }) => ({
        x,
        y: BOTTOM
      }));
    }
  };

  const stop = e => {
    if (e.key === 'ArrowUp') {
      setTimeout(() => {
        setStoped(stoped => {
          if (stoped) {
            setSrc(humanWait);
          }
          return stoped;
        });
      }, JUMP_FRAME);

      setTimeout(
        () =>
          setJumpTimer(currentJumpTimer => {
            if (jumpTimer === currentJumpTimer) {
              setJumping(false);
            }
            return currentJumpTimer;
          }),
        JUMP_FRAME
      );

      return clearInterval(jumpTimer);
    }
    setStoped(true);
    clearInterval(timer);
    setSrc(humanWait);
    return undefined;
  };

  const [isGoLeft, setGoLeft] = useState(false);

  const goLeft = () => {
    if (isStoped) {
      setStoped(false);
      setTimer(
        setInterval(() => {
          setSrc(human);
          go('left');
        }, FRAME)
      );
      setGoLeft(true);
    }
  };

  const goRight = () => {
    if (isStoped) {
      setStoped(false);
      setTimer(
        setInterval(() => {
          setSrc(human);
          go('right');
        }, FRAME)
      );
      setGoLeft(false);
    }
  };

  const jump = () => {
    if (!isJumping) {
      setJumping(true);
      setSrc(human);
      go('top');
      setTimeout(() => {
        go('bottom');
      }, JUMP_FRAME / 2);

      setJumpTimer(
        setInterval(() => {
          setSrc(human);
          go('top');
          setTimeout(() => {
            go('bottom');
          }, JUMP_FRAME / 2);
        }, JUMP_FRAME)
      );
    }
  };

  const onKeyDown = e => {
    setInteracted(true);

    if (e.key === 'ArrowLeft') {
      goLeft();
    }

    if (e.key === 'ArrowRight') {
      goRight();
    }

    if (e.key === 'ArrowUp') {
      jump();
    }
  };

  return (
    <>
      <Container
        tabIndex={0}
        ref={container}
        onKeyDown={onKeyDown}
        onKeyUp={stop}
        onMouseDown={() => setInteracted(true)}
        onTouchStart={() => setInteracted(true)}
      >
        <Button
          onMouseDown={goLeft}
          onMouseUp={stop}
          onTouchStart={goLeft}
          onTouchEnd={stop}
        />
        <Main>
          <Background ref={map} src={bg} width={width} alt="bg" />
          <Content>
            <Human
              isGoLeft={isGoLeft}
              src={src}
              alt="human"
              position={position}
              width={humanWidth}
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
      <audio ref={audioPlayer} src={track}>
        <track kind="captions" />
      </audio>
      <audio ref={audioPlayer2} src={track2}>
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
  overflow: hidden;
  width: 100vw;
  height: 100vh;
`;

const Main = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  height: 100vh;
  overflow: hidden;
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
  min-height: 100%;
  width: auto;
  image-rendering: pixelated;
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
  margin-left: ${({ position }) => position.x}px;
  margin-bottom: ${({ position }) => position.y}px;
  transform: scale(${({ isGoLeft }) => (isGoLeft ? -1 : 1)}, 1);
  width: ${({ width }) => width};

  transition: margin-bottom ${JUMP_FRAME / 2}ms ease-in,
    margin-left ${FRAME}ms linear;
`;
