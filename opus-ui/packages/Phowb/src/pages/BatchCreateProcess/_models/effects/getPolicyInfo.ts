import lodash from 'lodash';
import { getPolicyInfoByPolicyNo } from '@/services/posControllerService';
import { formUtils } from 'basic/components/Form';
import handleMessageModal from '@/utils/commonMessage';

export default function* (action: any, { put, call, select }: any) {
  const { policyNo } = lodash.pick(action?.payload, ['policyNo']);
  const { policyInfo } = yield select((state) => ({
    policyInfo: state?.batchCreateProcess?.policyInfo,
  }));
  const value = formUtils.queryValue(policyNo);
  if (!value) {
    return false;
  }
  const response = yield call(getPolicyInfoByPolicyNo, {
    policyNo: value,
  });

  const { resultData = {}, success, promptMessages } = lodash.pick(response, [
    'resultData',
    'success',
    'promptMessages',
  ]);
  if (!success) {
    handleMessageModal(promptMessages);
  }
  const { posRequestInformation } = lodash.pick(resultData, ['posRequestInformation']);
  const submissionInfo = lodash.pick(policyInfo?.posRequestInformation, [
    'submissionDate',
    'submissionChannel',
    'submissionTime',
  ]);
  yield put({
    type: 'setPolicyInfo',
    payload: {
      policyInfo: {
        ...resultData,
        posRequestInformation: {
          ...posRequestInformation,
          ...submissionInfo,
        },
      },
    },
  });
  yield put({
    type: 'saveSnapshot',
  });
}
