import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '../../utils/normalizrUtils';

export default function* getDataForSubmit(_, { select }) {
  const { claimProcessData, claimEntities, taskDetail } = yield select((state) => ({
    claimProcessData: state.bpOfDataCaptureController.claimProcessData,
    claimEntities: state.bpOfDataCaptureController.claimEntities,
    taskDetail: state.processTask.getTask,
  }));
  const { processInstanceId, taskId, taskDefKey, assessmentType } = lodash.pick(taskDetail, [
    'processInstanceId',
    'taskId',
    'taskDefKey',
    'assessmentType',
  ]);
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));

  const dataForSubmit = {
    ...claimData,
    activityKey: taskDefKey,
    taskId,
    processInstanceId,
    assessmentType,
  };
  return dataForSubmit;
}
