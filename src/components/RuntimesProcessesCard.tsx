import React, { useEffect, useState } from 'react';
import { fetchJvmInstances } from '../api/api';
import { JvmInstance, RuntimesInventoryResponse } from '../api/interfaces';
import ProcessesAccordion from './RuntimesProcessesAccordion';
import InventorySystemPropertiesCard from './InventorySystemPropertiesCard';

/**
 * The RuntimesProcessesCard is a component exported using federated modules
 * to display runtimes-inventory information on the Insights > Systems pages.
 *
 * The RuntimesProcessesCard is comprised of a couple of nested components.
 *
 * If the get request to fetch JvmInstance data successfully returns instances,
 * then delegate to InventorySystemPropertiesCard, which mimics the look and
 * feel of the LoadingCard used by insights-inventory-frontend. If the fetch
 * returns no instances, then simply return an empty React Fragment.
 * The InventorySystemProperties additionally handles the UX for the loading
 * state, and displays a number of skeleton rows while the data retrieval is
 * happening.
 *
 * Once the runtimes-inventory information has been retrieved, the instance
 * data is passed into the RuntimesProcessesAccordion, which iterates through
 * each instance and displays information as denoted in the instanceDataRows map.
 *
 * @param hostname the fqdn of the host to display processes for
 */
const RuntimesProcessesCard = ({ hostname }: { hostname: string }) => {
  const [instances, setInstances] = useState<JvmInstance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response: RuntimesInventoryResponse = await fetchJvmInstances(
          hostname
        );
        const instances: JvmInstance[] = response?.response;
        setInstances(instances);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!isLoading && instances.length == 0) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <InventorySystemPropertiesCard
      title="Application Services Processes"
      isLoading={isLoading}
      content={<ProcessesAccordion instances={instances} />}
    ></InventorySystemPropertiesCard>
  );
};

export default RuntimesProcessesCard;
