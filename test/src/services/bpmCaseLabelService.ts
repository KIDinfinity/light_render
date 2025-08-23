import request from '@/utils/request';

export async function getApplicableLabelCodes(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/caseLabel/getApplicableLabelCodes', {
    ...option,
    method: 'GET',
  });
}

export default {
  getApplicableLabelCodes,
};
