import request from '@/utils/request';

export async function getByClientInfo(params?: any, option?: any): Promise<any> {
  return request('/api/c360/partyInfo/getByClientInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getByPartyId(params?: any, option?: any): Promise<any> {
  return request('/api/c360/partyInfo/getByPartyId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function identity(params?: any, option?: any): Promise<any> {
  return request('/api/c360/partyInfo/identity', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function identityV2(params?: any, option?: any): Promise<any> {
  return request('/api/c360/partyInfo/identityV2', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function identityV3(params?: any, option?: any): Promise<any> {
  return request('/api/c360/partyInfo/identityV3', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export default {
  getByClientInfo,
  getByPartyId,
  identity,
  identityV2,
  identityV3
};
