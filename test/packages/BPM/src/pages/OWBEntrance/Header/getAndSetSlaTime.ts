import lodash from 'lodash';
import getSlaTime from './getSlaTime';

export default async ({ taskDetail, setSlaTime }: any) => {
  const { processInstanceId, taskDefKey } = lodash.pick(taskDetail, [
    'processInstanceId',
    'taskDefKey',
  ]);
  if (processInstanceId && taskDefKey) {
    const remainTime = await getSlaTime({ processInstanceId, taskDefKey });
    setSlaTime(Math.max(Number(remainTime), 0));
  }
};
