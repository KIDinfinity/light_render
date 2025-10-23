
import { stringify } from 'qs';
import request from '@/utils/request';

export async function genCombineMenu(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/jp/data/combine/genCombineMenu?${stringify(params)}`, {
    ...option,
  });
}

export async function genCombineMenu1(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/jp/data/combine/genCombineMenu1?${stringify(params)}`, {
    ...option,
  });
}

export async function initCombineData(params?: any, option?: any): Promise<any> {
  return request(`/api/cc/jp/data/combine/initCombineData?${stringify(params)}`, {
    ...option,
  });
}

export default {
  genCombineMenu,
  genCombineMenu1,
  initCombineData,
}
