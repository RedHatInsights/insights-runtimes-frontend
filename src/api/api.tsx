import instance from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { RuntimesInventoryResponse } from './interfaces';

export const RUNTIMES_BASE_URL = '/api/runtimes-inventory-service/v1';

export const fetchRuntimesInstances = (hostname: string) => {
  return instance.get<unknown, RuntimesInventoryResponse>(
    `${RUNTIMES_BASE_URL}/instances?hostname=${hostname}&includeRaw=false`
  );
};
