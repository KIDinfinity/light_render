
import { stringify } from 'qs';
import request from '@/utils/request';

export async function findDataImageFunction(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/function/findDataImageFunction?${stringify(params)}`, {
    ...option,
  });
}

export async function findFunction(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/function/findFunction?${stringify(params)}`, {
    ...option,
  });
}

export async function listMenu(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/function/listMenu?${stringify(params)}`, {
    ...option,
  });
}

export default {
  findDataImageFunction,
  findFunction,
  listMenu,
}
