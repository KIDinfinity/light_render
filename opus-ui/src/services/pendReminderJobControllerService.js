import request from '@/utils/request';

export async function executePendReminderJob(params) {
  return request('/api/bpm/pend/reminder/job/executePendReminderJob', {
    method: 'POST',
    body: params,
  });
}

export default {
  executePendReminderJob,
};
