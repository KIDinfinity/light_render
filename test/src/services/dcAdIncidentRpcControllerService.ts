
import request from '@/utils/request';

export async function getADIncidentForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getADIncidentForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getADPartOfBodyInjured(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getADPartOfBodyInjured', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getADIncidentForWool,
  getADPartOfBodyInjured,
}
