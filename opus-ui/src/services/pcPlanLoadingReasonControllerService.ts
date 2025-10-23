import { stringify } from 'qs';
import request from '@/utils/request';

export async function findByRegionAndFuncType(params?: any, option?: any): Promise<any> {
  return request(`/api/pc/planLoadingReason/v2/findByRegionAndFuncType?${stringify(params)}`, {
    ...option,
    method: 'POST',
  });
}

export default {
  findByRegionAndFuncType,
};
