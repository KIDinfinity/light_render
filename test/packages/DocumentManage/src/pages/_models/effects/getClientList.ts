import lodash from 'lodash';
import { findDocRelCustomerInf } from '@/services/owbRegistrationSubmissionControllerService';

export default function* getClientList({ payload }: any, { call, put, select }: any) {
  const { personalDocInd, applicationNo } = payload;

  const { clientObject } = yield select(({ documentManagement }: any) => ({
    clientObject: documentManagement.clientObject,
  }));

  if (!lodash.has(clientObject, personalDocInd)) {
    const response = yield call(findDocRelCustomerInf, {
      personalDocInd,
      applicationNo,
    });

    const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
    if (success && resultData) {
      yield put({
        type: 'saveClientObject',
        payload: {
          key: personalDocInd,
          value: resultData,
        },
      });
    }
  }
}
