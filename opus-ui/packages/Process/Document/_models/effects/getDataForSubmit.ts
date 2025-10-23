import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';

export default function* getDataForSubmit(_: any, { select }: any) {
  const businessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );

  const taskDetail = yield select(({ processTask }: any) => processTask?.getTask);
  const dataForSubmit = {
    ...formUtils.cleanValidateData(businessData),
    ...lodash.pick(taskDetail, ['processInstanceId', 'taskId', 'taskDefKey', 'assessmentType']),
  };
  return dataForSubmit;
}
