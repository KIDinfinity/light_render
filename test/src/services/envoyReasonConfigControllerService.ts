import { stringify } from 'qs';
import request from '@/utils/request';

export async function listCaseReasonConfigs(params?: any, option?: any): Promise<any> {
  return request(`/api/evy/config/listCaseReasonConfigs?${stringify(params)}`, {
    ...option,
  });
}

export async function listConfigs(params?: any, option?: any): Promise<any> {
  return request(`/api/evy/config/listConfigs?${stringify(params)}`, {
    localCache: true,
    ...option,
  });
}

export async function listEnvoyBatchSendConfig(params?: any, option?: any): Promise<any> {
  return request(`/api/evy/config/listEnvoyBatchSendConfig?${stringify(params)}`, {
    ...option,
  });
}

export default {
  listCaseReasonConfigs,
  listConfigs,
  listEnvoyBatchSendConfig,
};
