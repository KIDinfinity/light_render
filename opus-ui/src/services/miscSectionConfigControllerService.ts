import request from '@/utils/request';

export async function findAll(params?: any, option?: any): Promise<any> {
  return request('/api/misc/sectionConfig/findAll', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getRopList(params?: any, option?: any): Promise<any> {
  return request('/api/pc/getMiscConfig', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findAll,
  getRopList,
};
