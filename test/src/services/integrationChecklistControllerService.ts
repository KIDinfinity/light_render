
import request from '@/utils/request';

export async function getIntegrationCallRecordDetail(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/checklist/getIntegrationCallRecordDetail`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getIntegrationCallRecords(params?: any, option?: any): Promise<any> {
  return request(`/api/integration/checklist/getIntegrationCallRecords`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getIntegrationCallRecordDetail,
  getIntegrationCallRecords,
}
