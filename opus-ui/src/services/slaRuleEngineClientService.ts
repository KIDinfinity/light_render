
import request from '@/utils/request';

export async function scoreForPrioritizedTask(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/task/scoreForPrioritizedTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  scoreForPrioritizedTask,
}
