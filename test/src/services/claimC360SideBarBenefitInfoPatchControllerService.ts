
import { stringify } from 'qs';
import request from '@/utils/request';

export async function patchAll(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/c360SideBar/benefitInfo/patchAll?${stringify(params)}`, {
    ...option,
  });
}

export async function patchByRegionCode(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/c360SideBar/benefitInfo/patchByRegionCode?${stringify(params)}`, {
    ...option,
  });
}

export default {
  patchAll,
  patchByRegionCode,
}
