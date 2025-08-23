import lodash from 'lodash';
import { denormalizeClaimData } from '../../Utils/normalizrUtils';
import { formUtils } from 'basic/components/Form';

export default function* (_, { select }) {
  const { claimProcessData, claimEntities } = yield select(
    (state) => state.JPCLMOfClaimRegistrationController
  );
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  if (lodash.isEmpty(claimData)) {
    return false;
  }
  const taskDetail = yield select((state) => state.processTask.getTask);
  const dataForSubmit = {
    ...claimData,
    taskId: taskDetail?.taskId,
    processInstanceId: taskDetail?.processInstanceId,
  };
  return dataForSubmit;
}
