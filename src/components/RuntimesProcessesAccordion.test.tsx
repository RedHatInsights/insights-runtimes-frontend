import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import RuntimesProcessesAccordion from './RuntimesProcessesAccordion';
import '@testing-library/jest-dom';
import {
  fooInstance,
  getCopyOfInstance,
  mockInstance,
} from '../utils/test-utils';
import { formatInstancesData } from '../utils/utils';

describe('Runtimes Processes Accordion', () => {
  it('should display instance information', () => {
    const { container } = render(
      <RuntimesProcessesAccordion
        instances={formatInstancesData([getCopyOfInstance(mockInstance)])}
      />
    );
    expect(
      container.querySelector('.pf-v5-c-accordion__toggle-text')?.innerHTML
    ).toEqual('mockWorkload');
  });

  it('should be expanded if there is only one response', () => {
    const { container } = render(
      <RuntimesProcessesAccordion
        instances={formatInstancesData([getCopyOfInstance(mockInstance)])}
      />
    );
    expect(
      container
        .querySelector('#instance-0-toggle')
        ?.className.includes('pf-m-expanded')
    ).toBe(true);
  });

  it('should not be expanded if there is more than one', () => {
    const { container } = render(
      <RuntimesProcessesAccordion
        instances={formatInstancesData([
          getCopyOfInstance(fooInstance),
          getCopyOfInstance(mockInstance),
        ])}
      />
    );
    expect(
      container
        .querySelector('#instance-0-toggle')
        ?.className.includes('pf-m-expanded')
    ).toBe(false);
  });

  it('should toggle row expansion when clicked', () => {
    const { container } = render(
      <RuntimesProcessesAccordion
        instances={formatInstancesData([getCopyOfInstance(mockInstance)])}
      />
    );
    const fooButton = container.querySelector('#instance-0-toggle');
    if (!fooButton) {
      fail('Accordion expansion button could not be found.');
    }

    // Verify the accordion toggles to close
    fireEvent.click(fooButton);
    expect(
      container
        .querySelector('#instance-0-toggle')
        ?.className.includes('pf-m-expanded')
    ).toBe(false);

    // Verify the accordion toggles to re-open
    fireEvent.click(fooButton);
    expect(
      container
        .querySelector('#instance-0-toggle')
        ?.className.includes('pf-m-expanded')
    ).toBe(true);
  });

  // MWTELE-271
  it('should generate a title if both workload and app.name is empty', () => {
    const modifiedInstance = getCopyOfInstance(mockInstance);
    modifiedInstance.workload = '';
    const { container } = render(
      <RuntimesProcessesAccordion
        instances={formatInstancesData([modifiedInstance])}
      />
    );
    expect(
      container.querySelector('.pf-v5-c-accordion__toggle-text')?.innerHTML
    ).toEqual('Unknown workload');
  });
});
