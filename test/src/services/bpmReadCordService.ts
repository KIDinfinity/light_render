import request from '@/utils/request';

export async function addBizObjReadRecord(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/readrecord/addBizObjReadRecord', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function inquiryUserBizObjReadHistory(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/readrecord/inquiryUserBizObjReadHistory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  addBizObjReadRecord,
  inquiryUserBizObjReadHistory,
};
