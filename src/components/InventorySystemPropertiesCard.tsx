import React, { ReactNode } from 'react';
import {
  Card,
  CardBody,
  Content,
  ContentVariants,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import SkeletonRows from './SkeletonRows';

// Modified version of the LoadingCard as seen in insights-inventory-frontend
// See: https://github.com/RedHatInsights/insights-inventory-frontend/blob/master/src/components/GeneralInfo/LoadingCard/LoadingCard.js
// The Runtimes content is displayed in an Accordion, so the regular way of using the loading card with formatted items will not work.
// Instead, this card mimics the look and feel of the System Properties Card, and will display the Runtimes Accordion as the content.
const InventorySystemPropertiesCard = ({
  title,
  isLoading,
  content,
  cardId = 'system-properties-card',
}: {
  title: string;
  isLoading: boolean;
  content: ReactNode;
  cardId?: string;
}) => {
  return (
    <Card ouiaId={`${cardId}`} style={{ overflow: 'unset' }}>
      <CardBody>
        <Stack hasGutter>
          <StackItem>
            <Content>
              <Content
                component={ContentVariants.h1}
                ouiaId="SystemPropertiesCardTitle"
              >
                {title}
              </Content>
            </Content>
          </StackItem>
          <StackItem isFilled>
            {isLoading ? <SkeletonRows numRows={3} /> : content}
          </StackItem>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default InventorySystemPropertiesCard;
