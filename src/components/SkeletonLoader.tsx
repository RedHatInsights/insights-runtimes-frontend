import React from 'react';
import { Skeleton } from '@patternfly/react-core';
import PropTypes from 'prop-types';

// Borrowed from RedHatInsights/edge-frontend CmpLoader
// https://github.com/RedHatInsights/edge-frontend/blob/master/src/components/CmpLoader.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SkeletonLoader = ({ numberOfRows }: any) => {
  const rows = [];

  for (let i = 0; i < numberOfRows; i++) {
    rows.push(
      <React.Fragment key={i}>
        <Skeleton />
        <br />
      </React.Fragment>
    );
  }
  return <React.Fragment>{rows}</React.Fragment>;
};

export default SkeletonLoader;

SkeletonLoader.propTypes = {
  numberOfRows: PropTypes.number,
};
