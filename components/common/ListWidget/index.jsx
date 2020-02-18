import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListWidget = ({ title, children, ...restProps }) => (
  <Wrapper {...restProps}>
    <Title>{title}</Title>
    <Content>
      <ItemsWrapper>{children}</ItemsWrapper>
    </Content>
  </Wrapper>
);

ListWidget.propTypes = {
  children: PropTypes.array,
  title: PropTypes.string
};

export default ListWidget;

const Title = styled.h2`
  font-weight: 600;
  font-size: 2rem;
  line-height: 27px;
  text-align: center;
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

const Wrapper = styled.div`
  width: calc(33% - 7px);
  display: flex;
  flex-direction: column;
`;
