import { getPersonNames } from '@/services/posSrvCaseInquiryControllerService';
import lodash from 'lodash';

export default function* getPersonName({ payload }, { put, call }: any) {
  const { ICCode, fullName, transactionId } = payload;
  const result = yield call(getPersonNames, {
    regisSaleNo: ICCode,
  });
  const personName = result.success ? result.resultData : null;

  yield put({
    type: 'savePersonName',
    payload: {
      personName,
    },
  });
  const validICInformation =
    personName && lodash.includes([personName?.fullName, personName?.givennameTh], fullName)
      ? 'Y'
      : 'N';
  yield put({
    type: 'updateValidICInformation',
    payload: {
      validICInformation,
      transactionId,
    },
  });
}
