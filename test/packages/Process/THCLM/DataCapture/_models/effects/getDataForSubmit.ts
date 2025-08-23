import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '../../utils/normalizrUtils';
import { translateIncidentOfDataForBe } from '../../utils/translateDataForBe';

export default function* getDataForSubmit(_, { select }) {
  const claimProcessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  const claimEntities = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask);
  const taskNotEditable = yield select(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const { processInstanceId, taskId, taskDefKey, assessmentType } = lodash.pick(taskDetail, [
    'processInstanceId',
    'taskId',
    'taskDefKey',
    'assessmentType',
  ]);

  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const claimData: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(denormalizedData)
  );

  if (lodash.isEmpty(claimData)) return {};

  lodash.set(claimData, 'taskNotEditable', taskNotEditable);
  const dataForSubmit = {
    ...claimData,
    incidentList: translateIncidentOfDataForBe(claimData?.incidentList),
    activityKey: taskDefKey,
    taskId,
    processInstanceId,
    assessmentType,
  };
  return dataForSubmit;
}
