import lodash from 'lodash';
import { getProposalFlags } from '@/services/owbNbNbInquiryControllerService';

export default function* ({ payload }: any, { call, put }) {
  const { applicationNo } = lodash.pick(payload, ['applicationNo']);
  if (applicationNo) {
    const response = yield call(getProposalFlags, {
      applicationNo,
    });
    const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
    if (success) {
      yield put({
        type: `saveProposalFlags`,
        payload: {
          ...lodash.pick(resultData, ['needPremRecal', 'newSiRequired', 'needResendCol']),
        },
      });
    }
  }
}
