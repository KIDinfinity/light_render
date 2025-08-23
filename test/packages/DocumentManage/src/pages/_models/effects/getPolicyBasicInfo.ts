import lodash from 'lodash';
import { requestPolicyBasicInfo } from '@/services/docViewControllerService';

/**
 * 从task detail中获取case information
 */
export default function* getPolicyBasicInfo({ payload }: any, { call, put }: any) {
  const response = yield call(requestPolicyBasicInfo, payload);

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && resultData?.policyOwnerList?.[0]?.policyId && resultData?.clientInfoList?.[0]) {
    const data = resultData.clientInfoList[0];
    return {
      policyOwnerName: data.firstName + ' ' + data.surname,
      identityNo: data.identityNo
    }
  }
  return {
    policyOwnerName: '',
    identityNo: ''
  }
}
