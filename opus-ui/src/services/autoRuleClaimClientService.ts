
import request from '@/utils/request';

export async function getHospitalBatchClaimNoByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/hospital/getHospitalBatchClaimNoByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getHospitalBatchClaimNoByClaimNo,
}
