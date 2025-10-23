import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '../functions/normalizeFunc';

export default function* (_, { select }) {
  const taskDetail = yield select((state) => state.processTask.getTask);
  const { processInstanceId, taskId, taskDefKey, assessmentType } = lodash.pick(taskDetail, [
    'processInstanceId',
    'taskId',
    'taskDefKey',
    'assessmentType',
  ]);
  const { claimProcessData, claimEntities } = yield select(
    (state) => state.JPCLMOfClaimAssessmentController
  );
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  if (lodash.isEmpty(claimData)) {
    return false;
  }
  const dataForSubmit = {
    ...claimData,
    assessmentType: claimData?.assessmentType || assessmentType,
    activityKey: taskDefKey,
    taskId,
    processInstanceId,
  };
  delete dataForSubmit.variables;
  delete dataForSubmit.notificationList;
  return dataForSubmit;
}
