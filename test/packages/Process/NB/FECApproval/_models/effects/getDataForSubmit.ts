import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import { formUtils } from 'basic/components/Form';

export default function* getDataForSubmit(_, { select }) {
  const targetData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );

  const taskDetail = yield select(({ processTask }: any) => processTask?.getTask);
  const taskNotEditable = yield select(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const { processInstanceId, taskId, taskDefKey, assessmentType } = lodash.pick(taskDetail, [
    'processInstanceId',
    'taskId',
    'taskDefKey',
    'assessmentType',
  ]);

  const businessData: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(targetData));

  if (lodash.isEmpty(businessData)) return {};

  lodash.set(businessData, 'taskNotEditable', taskNotEditable);

  const dataForSubmit = {
    businessData,
    activityKey: taskDefKey,
    taskId,
    processInstanceId,
    assessmentType,
  };
  return dataForSubmit;
}
