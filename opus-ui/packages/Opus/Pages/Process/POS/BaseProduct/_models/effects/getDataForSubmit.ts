import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { OptionEnum, PremiumTypeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from '../../activity.config';
import { denormalizeData } from '../../utils/normalizrUtils';

type IResponse = Record<string, any>;

export default function* getDataForSubmit(action, { select }: any) {
  const isSave = action?.payload?.isSave;
  const taskDetail: IResponse = yield select(({ processTask }: any) => processTask.getTask);
  const taskNotEditable: IResponse = yield select(
    ({ claimEditable }: any) => claimEditable.taskNotEditable
  );
  const processData: IResponse = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  );
  const entities: IResponse = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities
  );
  const transactionTypeCodeMap: IResponse = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.transactionTypeCodeMap
  );

  const { processInstanceId, taskId, taskDefKey, assessmentType } = lodash.pick(taskDetail, [
    'processInstanceId',
    'taskId',
    'taskDefKey',
    'assessmentType',
  ]);
  const denormalizedData = denormalizeData(processData, entities);

  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));

  if (lodash.isEmpty(claimData)) {
    return {};
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
