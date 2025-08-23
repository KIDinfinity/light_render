import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';

type IResponse = Record<string, any>;

export default function* getDataForSubmit(action, { select }: any) {
  const taskDetail: IResponse = yield select(({ processTask }: any) => processTask.getTask);
  const taskNotEditable: IResponse = yield select(
    ({ claimEditable }: any) => claimEditable.taskNotEditable
  );
  const processData: IResponse = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  );

  const { processInstanceId, taskId, taskDefKey, assessmentType } = lodash.pick(taskDetail, [
    'processInstanceId',
    'taskId',
    'taskDefKey',
    'assessmentType',
  ]);

  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(processData));

  if (claimData?.policyInfo?.applyToPolicyInfoList) {
    lodash.set(
      claimData,
      'policyInfo.policyInfoList',
      claimData?.policyInfo?.applyToPolicyInfoList || []
    );
  }

  return {
    ...claimData,
    taskId,
    taskNotEditable,
    activityKey: taskDefKey,
    processInstanceId,
    assessmentType,
  };
}
