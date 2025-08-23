
import request from '@/utils/request';

export async function downloadRuleSetLiquibase(params?: any, option?: any): Promise<any> {
  return request('/api/ruleEngine/downloadRuleSetLiquibase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  downloadRuleSetLiquibase,
}
