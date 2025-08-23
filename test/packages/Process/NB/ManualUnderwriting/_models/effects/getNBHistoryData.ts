import lodash from 'lodash';
import { getUwProposal } from '@/services/owbNbNbInquiryControllerService';

export default function* getNBHistoryData({ payload }: any, { call, put, select }: any) {
  const { businessNo, inquiryBusinessNo, caseCategory } = payload;
  const response = yield call(getUwProposal, {
    businessNo,
    inquiryBusinessNo,
    caseCategory,
  });

  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const businessData = lodash.get(response, 'resultData.businessData');
    yield put({
      type: 'saveNBHistoryData',
      payload: {
        nbHistoryData: { ...businessData },
      },
    });
  }

  return response;
}
