import request from '@/utils/request';

export async function changeSeqNo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/lifej/changeSeqNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/lifej/getClaimInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function requestRefundAmount(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/lifej/requestRefundAmount', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function reversal(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/lifej/reversal', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function requestLifeJClaimId(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/lifej/registerLifej', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function requestLifeJRefundInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/lifej/refreshRefundInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimInfoByNo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/lifej/getClaimInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function saveKlipCaseInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/lifej/saveKlipCaseInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function refreshRefundInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/modification/refreshRefundInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function syncNonOPUSClaimData(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/lifej/syncNonOpusClaimData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  changeSeqNo,
  getClaimInfo,
  requestRefundAmount,
  reversal,
  requestLifeJClaimId,
  requestLifeJRefundInfo,
  getClaimInfoByNo,
  refreshRefundInfo,
  saveKlipCaseInfo,
};
