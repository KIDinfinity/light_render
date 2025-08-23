import lodash from 'lodash';
import { getUsTaxInformationByPosNo } from '@/services/posControllerService';

export default function* ({ payload }: any, { put, call }: any) {
  const { posNo } = payload;
  if (!posNo) return;
  const response = yield call(getUsTaxInformationByPosNo, { posNo });
  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    yield put({
      type: 'updateUsTaxInformation',
      payload: {
        usTaxInformation: response.resultData.usTaxDeclarations,
      },
    });
  }
}
