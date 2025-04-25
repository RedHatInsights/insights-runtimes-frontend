import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InventorySystemPropertiesCard from './InventorySystemPropertiesCard';

describe('Inventory System Properties Card', () => {
  it('should render 3 skeleton rows while loading', () => {
    const { container } = render(
      <InventorySystemPropertiesCard
        title="Test"
        isLoading={true}
        content={<p>Test Content</p>}
      />,
    );
    expect(container.getElementsByClassName('pf-v5-c-skeleton').length).toBe(3);
  });

  it('should not render passed content while loading', () => {
    render(
      <InventorySystemPropertiesCard
        title="Test"
        isLoading={true}
        content={<p>Test Content</p>}
      />,
    );
    expect(screen.queryByText('Test Content')).toBeNull();
  });

  it('should display passed content when finished loading', () => {
    render(
      <InventorySystemPropertiesCard
        title="Test"
        isLoading={false}
        content={<p>Test Content</p>}
      />,
    );
    expect(screen.queryByText('Test Content')).toBeDefined();
  });
});
