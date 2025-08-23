import request from '@/utils/request';

export async function getSurgicalPackageList(params?: any, option?: any): Promise<any> {
  return request('/api/claim/surgicalPackage/getSurgicalPackageList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getSurgicalPackageList,
};
