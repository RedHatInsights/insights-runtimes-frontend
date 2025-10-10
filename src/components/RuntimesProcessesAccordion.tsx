import { Fragment, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
  Content,
  ContentVariants,
} from '@patternfly/react-core';
import React from 'react';
import { EapInstance, JvmInstance } from '../api/interfaces';

export interface InstanceInfoTitles {
  id: string; // JvmInstance attribute key
  title: string; // formatted string to be displayed in the accordion content
}

// List where each entry contains the JSON attribute key and the corresponding formatted title for the row
// If the id doesn't exist on the instance, it will be ignored when writing values into the card
export const instanceDataRows: Array<InstanceInfoTitles> = [
  { id: 'workload', title: 'Workload Type' },
  { id: 'created', title: ' Created' },
  { id: 'eapVersion', title: 'EAP Version' },
  { id: 'appName', title: 'Application' },
  { id: 'processors', title: 'Cores' },
  { id: 'javaVendor', title: 'JVM Vendor' },
  { id: 'versionString', title: 'JVM Version' },
  { id: 'jvmHeapGcDetails', title: 'Garbage Collector Details' },
  { id: 'heapMin', title: 'Heap min (MB)' },
  { id: 'heapMax', title: 'Heap max (MB)' },
];

const RuntimesProcessesAccordion = ({
  instances,
}: {
  instances: JvmInstance[] | EapInstance[];
}) => {
  // Following code is borrowed from: https://www.patternfly.org/components/accordion/
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
  // If there is only 1 instance, default to the card being opened
  useEffect(() => {
    if (instances.length == 1) {
      setExpanded(['instance-0-toggle']);
    }
  }, []);
  return (
    <Accordion asDefinitionList={false} togglePosition="start">
      <Content>
        {instances.map((instance, index) => {
          return (
            <AccordionItem
              key={index}
              isExpanded={expanded.includes(`instance-${index}-toggle`)}
            >
              <AccordionToggle
                id={`instance-${index}-toggle`}
                onClick={() => toggle(`instance-${index}-toggle`)}
                style={{
                  // the styling for the Accordion is pulling in the pf4-v5.css
                  // these are used to make it look more like the pf5 Accordion at the moment
                  justifyContent: 'start',
                  columnGap: 16,
                }}
              >
                {instance.title}
              </AccordionToggle>
              <AccordionContent
                style={{
                  // by default the Accordion content is smaller and light gray, which is kind of hard to read
                  // use the following styling to better match the mockups
                  fontSize: 'inherit',
                  color: 'inherit',
                }}
              >
                <Content component={ContentVariants.dl}>
                  {instanceDataRows.map((row) => {
                    if (instance[row.id as keyof typeof instance]) {
                      return (
                        <Fragment key={`${row.id} title`}>
                          <Content
                            id={`${instance.title}-${row.id}-title`}
                            key={`${row.id} title`}
                            component={ContentVariants.dt}
                            aria-label={`${instance.title} ${row.id} title`}
                          >
                            {row.title}
                          </Content>
                          <Content
                            id={`${instance.title}-${row.id}-value`}
                            key={`${row.id} value`}
                            component={ContentVariants.dd}
                            aria-label={`${instance.title} ${row.id} value`}
                          >
                            {instance[row.id as keyof typeof instance]}
                          </Content>
                        </Fragment>
                      );
                    }
                  })}
                </Content>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Content>
    </Accordion>
  );
};

export default RuntimesProcessesAccordion;
