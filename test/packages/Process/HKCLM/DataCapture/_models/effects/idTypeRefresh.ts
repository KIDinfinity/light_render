import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import { formUtils } from 'basic/components/Form';
import { refreshClaimantValidIDInfo } from '@/services/claimRefreshPolicyAgentControllerService';
export default function* idTypeRefresh(_: any, { call, put, select }: any) {
  const insuredInfo = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.insured
  );
  const relationshipWithInsured = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimProcessData?.claimant?.relationshipWithInsured
  );
  const taskDetail = yield select(({ processTask }: any) => processTask?.getTask);
  const businessNo = lodash.get(taskDetail, 'businessNo');

  const params = {
    insured: {
      claimNo: businessNo || '',
      ...lodash.pick(formUtils.objectQueryValue(insuredInfo), ['insuredId', 'policyId']),
    },
    claimant: {
      claimNo: businessNo || '',
      relationshipWithInsured,
    },
    regionCode: 'HK',
  };

  const response = yield call(refreshClaimantValidIDInfo, params);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  const refreshIDInfo = lodash.pick(resultData, [
    'idType',
    'idIssueDate',
    'idExpiryDate',
    'idNoExpiryDateFlag',
    'ageAdmitIndicator',
    'idValidityResult',
    'idExemptedFlag',
  ]);
  if (success && !lodash.isEmpty(resultData)) {
    yield put({
      type: 'saveClaimant',
      payload: {
        refreshIDInfo,
        idInfoRefresh: true,
      },
    });
  }

  return false;
}
