import lodash from 'lodash';
import { getCustomerIdentification } from '@/services/owbNbNbInquiryControllerService';

export default function* getCustomerIdentificationData({ payload }: any, { call, put }: any) {
  const { businessNo } = payload;
  const response = yield call(getCustomerIdentification, {
    businessNo,
  });
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const updatedData = response.resultData.businessData;

    yield put({
      type: 'saveClaimProcessData',
      payload: {
        claimProcessData: updatedData,
      },
    });
  }
}
