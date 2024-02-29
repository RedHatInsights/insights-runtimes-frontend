import React, { Fragment, Suspense, useEffect, useState } from 'react';

import AsyncComponent from '@redhat-cloud-services/frontend-components/AsyncComponent';
import instance from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
} from '@patternfly/react-core';
import SkeletonLoader from './SkeletonLoader';

// Array of arrays where each entry contains the JSON attribute and the corresponding title for the card
const rowNames = [
  ['workload', 'JVM instance'],
  ['deployments', 'EAP deployments'],
  ['appName', 'Application'],
  ['javaVendor', 'Vendor'],
  ['appUserDir', 'Application directory'],
  ['javaClassVersion', 'Class version'],
  ['javaVmName', 'VM name'],
  ['jvmHeapGcDetails', 'Heap gc details'],
  ['heapMin', 'Heap min'],
  ['heapMax', 'Heap max'],
  ['javaHome', 'Java home path'],
  // ['javaClassPath', 'Class path'], // this is kind of hefty in the UI, and not terribly useful ?
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LoadingCard = (props: any) => (
  <AsyncComponent
    appName="inventory"
    module="./LoadingCard"
    fallback={<SkeletonLoader numberOfRows={5} />}
    {...props}
  />
);

const RuntimesProcessesCard = () => {
  const [expanded, setExpanded] = useState(['']);
  const toggle = (id: string) => {
    const index = expanded.indexOf(id);
    const newExpanded: string[] =
      index >= 0
        ? [
            ...expanded.slice(0, index),
            ...expanded.slice(index + 1, expanded.length),
          ]
        : [...expanded, id];
    setExpanded(newExpanded);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any[]>([]);
  useEffect(() => {
    instance
      .get('/api/runtimes-inventory-service/v1/instances')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => setResponse(response.response))
      .catch((error) => console.warn(error));
  }, []);
  console.log(response);
  return (
    <Suspense fallback="">
      <LoadingCard title="Application Services Processes" isLoading={false}>
        <Accordion asDefinitionList={false} togglePosition="start">
          <TextContent>
            {response.map((instance, index) => {
              return (
                <AccordionItem key={index}>
                  <AccordionToggle
                    id={`${index}-toggle`}
                    onClick={() => toggle(`${index}-toggle`)}
                    isExpanded={expanded.includes(`${index}-toggle`)}
                    style={{
                      // the styling for the Accordion is pulling in the pf4-v5.css
                      // these are used to make it look more like the pf5 Accordion at the moment
                      justifyContent: 'start',
                      columnGap: 16,
                    }}
                  >
                    {instance.workload}
                  </AccordionToggle>
                  <AccordionContent
                    isHidden={!expanded.includes(`${index}-toggle`)}
                    style={{
                      // by default the Accordion content is smaller and light gray, which is kind of hard to read
                      // use the following styling to better match the mockups
                      fontSize: 'inherit',
                      color: 'inherit',
                    }}
                  >
                    <TextList component={TextListVariants.dl}>
                      {rowNames.map((row) => {
                        return (
                          <Fragment key={`${row[0]} title`}>
                            <TextListItem
                              component={TextListItemVariants.dt}
                              data-ouia-component-id={`${row[0]} title`}
                              aria-label={`${row[0]} title`}
                            >
                              {row[1]}
                            </TextListItem>
                            <TextListItem
                              key={`${row[0]} value`}
                              component={TextListItemVariants.dd}
                              data-ouia-component-id={`${row[0]} value`}
                              aria-label={`${row[0]} value`}
                            >
                              {instance[row[0]]}
                            </TextListItem>
                          </Fragment>
                        );
                      })}
                    </TextList>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </TextContent>
        </Accordion>
      </LoadingCard>
    </Suspense>
  );
};

export default RuntimesProcessesCard;
