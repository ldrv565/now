import React from 'react';
import PropTypes from 'prop-types';

const IndicatorLine = ({ currentCount, totalCount }) => {
  const indicator = currentCount / (totalCount / 100);

  return (
    <svg
      width="65%"
      height="4"
      style={{
        margin: '4px 0'
      }}
    >
      <rect opacity="0.2" width="100%" height="4" rx="2" fill="#156DF1" />

      <rect width={indicator} height="4" rx="2" fill="url(#paint0_linear)" />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="9.70577e-07"
          y1="3.15044"
          x2="0.336617"
          y2="-4.88637"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0095FF" />
          <stop offset="1" stopColor="#0057C2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

IndicatorLine.propTypes = {
  currentCount: PropTypes.number,
  totalCount: PropTypes.number
};

export default IndicatorLine;
