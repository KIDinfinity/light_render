import request from '@/utils/request';

export async function findAutoActivityCase(params?: any, option?: any): Promise<any> {
  return request(`/api/dc/processAutoActivity/findAutoActivityCase`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findAutoActivityCase,
};
