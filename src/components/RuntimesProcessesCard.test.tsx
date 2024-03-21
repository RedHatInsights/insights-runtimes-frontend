import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RuntimesProcessesCard from './RuntimesProcessesCard';
import * as api from '../api/api';
import { emptyResponse, mockInstance } from '../utils/test-utils';

describe('Runtimes Processes Card', () => {
  it('should not display anything if there is no data', async () => {
    const fetchSpy = jest
      .spyOn(api, 'fetchJvmInstances')
      .mockResolvedValue(emptyResponse);
    render(<RuntimesProcessesCard hostname={'empty'} />);
    await waitFor(() => {
      expect(fetchSpy).toBeCalledWith('empty');
    });
    expect(screen.queryByText('Application Services Processes')).toBeNull();
    expect(screen.queryByText('pf-v5-c-accordion')).toBeNull();
  });

  it('should not display anything if there is an error fetching data', async () => {
    console.error = jest.fn();
    const fetchSpy = jest
      .spyOn(api, 'fetchJvmInstances')
      .mockRejectedValue('error');
    render(<RuntimesProcessesCard hostname={'error'} />);
    await waitFor(() => {
      expect(fetchSpy).toBeCalledWith('error');
    });
    expect(console.error).toHaveBeenCalledWith('error');
    expect(screen.queryByText('Application Services Processes')).toBeNull();
    expect(screen.queryByText('pf-v5-c-accordion')).toBeNull();
  });

  it('should display content if there is data', async () => {
    const fetchSpy = jest
      .spyOn(api, 'fetchJvmInstances')
      .mockResolvedValue({ response: [mockInstance] });
    render(<RuntimesProcessesCard hostname={'mockHostname'} />);
    await waitFor(() => {
      expect(fetchSpy).toBeCalledWith('mockHostname');
    });
    expect(screen.queryByText('Application Services Processes')).toBeDefined();
    expect(screen.queryByText('pf-v5-c-accordion')).toBeDefined();
  });
});
