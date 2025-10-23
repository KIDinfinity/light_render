import lodash from 'lodash';
import { getContractTypeAndNoRepeat } from '@/services/owbNbCfgControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default function* ({ payload }: any, { call, put, select }: any): any {
  const contractType = lodash.get(payload, 'contractType');
  const taskDetail = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail
  );
  const response = yield call(
    getContractTypeAndNoRepeat,
    objectToFormData({
      contractType,
      submissionChannel: taskDetail?.submissionChannel || '',
    })
  );
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && lodash.isArray(resultData)) {
    yield put({
      type: 'setContractType',
      payload: {
        contractType: resultData,
      },
    });
  }
}
