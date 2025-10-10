import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkeletonRows from './SkeletonRows';

describe('Skeleton Rows', () => {
  it('should render as many skeleton rows as specified', () => {
    const numRows = 5;
    const { container } = render(<SkeletonRows numRows={numRows} />);
    expect(container.getElementsByClassName('pf-v6-c-skeleton').length).toBe(
      numRows,
    );
  });
});
