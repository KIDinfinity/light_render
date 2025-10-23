import lodash from 'lodash';
import { getContractTypeAndNoRepeat } from '@/services/owbNbCfgControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

export default function* ({ payload }: any, { select, call, put }: any): any {
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
  if (lodash.isPlainObject(response) && response?.success && lodash.isArray(response.resultData)) {
    yield put({
      type: 'saveContractTypeList',
      payload: {
        contractTypeList: lodash
          .chain(response.resultData)
          .map((el) => ({ dictCode: el, dictName: el }))
          .value(),
      },
    });
  }
}
