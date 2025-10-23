import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { denormalizeData } from '../../utils/normalizrUtils';
import { NAMESPACE } from '../../activity.config';

type IResponse = Record<string, any>;

export default function* getDataForSubmit(_, { select }: any) {
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

  const {
    processInstanceId,
    taskId,
    taskDefKey,
    assessmentType,
    submissionChannel,
  } = lodash.pick(taskDetail, [
    'processInstanceId',
    'taskId',
    'taskDefKey',
    'assessmentType',
    'submissionChannel',
  ]);

  const denormalizedData = denormalizeData(processData, entities);
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));

  if (lodash.isEmpty(claimData)) return {};

  claimData.transactionTypes =
    claimData.transactionTypes?.map((item) => ({
      ...item,
      applyToPolicyBOList: item.applyToPolicyBOList?.filter((boList) => boList),
    })) || [];

  return {
    ...claimData,
    taskId,
    taskNotEditable,
    activityKey: taskDefKey,
    processInstanceId,
    assessmentType,
    submissionChannel,
  };
}
