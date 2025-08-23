
import request from '@/utils/request';

export async function executePendReminderJob(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/pend/reminder/job/executePendReminderJob', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  executePendReminderJob,
}
