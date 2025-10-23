
import request from '@/utils/request';

export async function completeRelationGroup(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/group/completeRelationGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function createBenefitRelationGroup(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/group/createBenefitRelationGroup', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  completeRelationGroup,
  createBenefitRelationGroup,
}
