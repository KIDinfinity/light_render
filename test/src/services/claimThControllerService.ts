import request from '@/utils/request';

export async function getEarliestCoverageDate(params?: any, option?: any): Promise<any> {
  return request('/api/claim/th/getEarliestCoverageDate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getEarliestCoverageDate,
};
