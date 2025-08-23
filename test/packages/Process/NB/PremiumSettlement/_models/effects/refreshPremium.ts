import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { refreshPremium } from '@/services/owbNbProposalControllerService';
import addUpdateDate from '@/utils/addUpdateDate';

export default function* refreshProcess({ payload }: any, { call, put, select }: any) {
  const { businessNo, caseNo } = payload;
  const response = yield call(refreshPremium, objectToFormData({ businessNo, caseNo }));

  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    yield addUpdateDate(lodash.get(response, 'resultData.businessData.caseNo'));
    const policyList = lodash.get(response, 'resultData.businessData.policyList[0]');
    yield put({
      type: 'savePremiumData',
      payload: {
        premiumData: policyList,
      },
    });
  }

  return response;
}
