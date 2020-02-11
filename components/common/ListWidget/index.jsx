import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IndicatorLine from './IndicatorLine';

const ListWidget = ({ title, children, ...restProps }) => (
  <Wrapper {...restProps}>
    <Title>{title}</Title>
    <Content>
      <ItemsWrapper>{children}</ItemsWrapper>
    </Content>
  </Wrapper>
);

ListWidget.Item = ({
  currentCount,
  indicator,
  itemName,
  details,
  totalCount,
  postfix,
  prefix,
  background
}) => (
  <Item background={background} key={itemName}>
    <CountWrap>
      <CountBackground>
        <Count>{currentCount} </Count>
      </CountBackground>
    </CountWrap>

    <ItemContent>
      <NameOfGroup>{itemName}</NameOfGroup>

      {indicator && (
        <IndicatorLine currentCount={currentCount} totalCount={totalCount} />
      )}

      {details && <Description>{details} </Description>}

      {totalCount && (
        <Description>
          {postfix &&
            `${Math.floor(currentCount / (totalCount / 100))}% ${postfix}`}

          {prefix && `${prefix} ${totalCount - currentCount}`}
        </Description>
      )}
    </ItemContent>
  </Item>
);

ListWidget.propTypes = {
  children: PropTypes.array,
  title: PropTypes.string
};

ListWidget.Item.propTypes = {
  postfix: PropTypes.string,
  prefix: PropTypes.string,
  itemName: PropTypes.string,
  background: PropTypes.string,
  details: PropTypes.string,
  currentCount: PropTypes.number,
  totalCount: PropTypes.number,
  indicator: PropTypes.bool
};

export default ListWidget;

const Title = styled.h2`
  font-weight: 600;
  font-size: 2rem;
  line-height: 27px;
  margin: 24px 0 16px 0;
`;

const Content = styled.div`
  display: flex;
  padding: 12px 0px 8px 16px;
  background: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ItemsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CountBackground = styled.div`
  background: ${({ theme }) => theme.options.gradient};
`;

const CountWrap = styled.div`
  flex: 1;
  margin-right: 16px;
`;

const Count = styled.div`
  font-weight: 600;
  font-size: 4rem;
  line-height: 48px;
  text-align: center;
  background: ${({ theme }) => theme.palette.background.secondary};
  mix-blend-mode: lighten;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0 12px 12px;
  font-size: 1.4rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  background: url(${({ background }) => background}) no-repeat right bottom;
`;

const ItemContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 4;
`;

const NameOfGroup = styled.span`
  margin-bottom: 4px;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 19px;
`;

const Description = styled.span`
  font-weight: normal;
  font-size: 1.2rem;
  line-height: 15px;
  color: ${({ theme }) => theme.palette.gray.main};
`;

const Wrapper = styled.div`
  width: calc(33% - 7px);
  display: flex;
  flex-direction: column;
`;
