import React, { ReactNode } from 'react';
import {
  Card,
  CardBody,
  Stack,
  StackItem,
  Text,
  TextContent,
  TextVariants,
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
}: {
  title: string;
  isLoading: boolean;
  content: ReactNode;
}) => {
  return (
    <Card ouiaId="system-properties-card">
      <CardBody>
        <Stack hasGutter>
          <StackItem>
            <TextContent>
              <Text
                component={TextVariants.h1}
                ouiaId="SystemPropertiesCardTitle"
              >
                {title}
              </Text>
            </TextContent>
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
