import request from '@/utils/request';

export async function surgeryProcedure(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/surgeryProcedure', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchName(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/surgeryProcedure/searchName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchNameByRegion(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/surgeryProcedure/searchNameByRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function surgeryProcedureByRegion(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/surgeryProcedureByRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchSurgeryInfoByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/claim/surgeryProcedure/searchSurgeryInfoByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function searchSurgeryInfoByOriginServiceItemId(
  params?: any,
  option?: any
): Promise<any> {
  return request('/api/claim//surgeryProcedure/searchSurgeryInfoByOriginServiceItemId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  surgeryProcedure,
  searchName,
  searchNameByRegion,
  surgeryProcedureByRegion,
  searchSurgeryInfoByRegionCode,
  searchSurgeryInfoByOriginServiceItemId,
};
