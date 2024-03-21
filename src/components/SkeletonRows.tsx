import React from 'react';
import {
  Skeleton,
  SkeletonSize,
} from '@redhat-cloud-services/frontend-components/Skeleton';

const SkeletonRows = ({ numRows }: { numRows: number }) => {
  const skeletonRows = [];
  for (let i = 0; i < numRows; i++) {
    skeletonRows.push(
      <React.Fragment key={i}>
        <Skeleton size={SkeletonSize.lg} />
        <br />
      </React.Fragment>
    );
  }
  return <React.Fragment>{skeletonRows}</React.Fragment>;
};

export default SkeletonRows;
