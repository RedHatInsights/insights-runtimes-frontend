import React, { useEffect } from 'react';

import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateIcon,
} from '@patternfly/react-core';
import WrenchIcon from '@patternfly/react-icons/dist/esm/icons/wrench-icon';

const UnderConstructionPage = () => {
  const { appAction } = useChrome();

  useEffect(() => {
    appAction('under-construction');
  }, []);

  return (
    <Main>
      <EmptyState>
        <EmptyStateHeader
          titleText="Middleware Inventory"
          icon={<EmptyStateIcon icon={WrenchIcon} />}
        />
        <EmptyStateBody>
          This is the future home of the Middleware Inventory page.
        </EmptyStateBody>
      </EmptyState>
    </Main>
  );
};

export default UnderConstructionPage;
