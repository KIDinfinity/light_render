
import request from '@/utils/request';

export async function findSkillByUserId(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userSkill/findSkillByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findSkillByUserId,
}
