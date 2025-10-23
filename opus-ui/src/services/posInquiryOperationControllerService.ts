
import request from '@/utils/request';

export async function getPosDataByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/api/pos/inquiry/getPosDataByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPosPolicyRoleInfo(params?: any, option?: any): Promise<any> {
  return request('/api/pos/inquiry/getPosPolicyRoleInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getPosDataByBusinessNo,
  getPosPolicyRoleInfo,
}
