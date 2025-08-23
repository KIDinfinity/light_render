
import { stringify } from 'qs';
import request from '@/utils/request';

export async function patch(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/c360SideBar/claimHistory/patch?${stringify(params)}`, {
    ...option,
  });
}

export async function patchByClaimNoList(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/c360SideBar/claimHistory/patchByClaimNoList?${stringify(params)}`, {
    ...option,
  });
}

export async function patchByInsuredId(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/c360SideBar/claimHistory/patchByInsuredId?${stringify(params)}`, {
    ...option,
  });
}

export default {
  patch,
  patchByClaimNoList,
  patchByInsuredId,
}
