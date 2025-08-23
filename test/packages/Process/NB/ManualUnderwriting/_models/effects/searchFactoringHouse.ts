import lodash from 'lodash';
import { getCfgFactoringHousesByCondition } from '@/services/owbNbCfgControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';


export default function* ({ payload }: any, { call, put }: any) {
  const { submissionChannel } = lodash.pick(payload, [
    'submissionChannel'
  ]);
  const response = yield call(
    getCfgFactoringHousesByCondition,
    objectToFormData({
      submissionChannel
    })
  );
  if (response?.success && response?.resultData) {
    yield put({
      type: 'setFactoringHousesList',
      payload: {
        factoringHousesList: lodash.get(response, 'resultData', []),
      },
    });
  }
}
