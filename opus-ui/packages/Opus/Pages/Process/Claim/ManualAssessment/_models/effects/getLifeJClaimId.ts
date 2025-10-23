import { requestLifeJClaimId } from '@/services/claimJpLifejBoControllerService';
import { handleMessageModal } from '@/utils/commonMessage';
import bpm from 'bpm/pages/OWBEntrance';

export default function* getLifeJClaimId({ payload }: any, { call, put }: any) {
  const { policyNo, incidentId, businessData } = payload;

  const response = yield call(requestLifeJClaimId, { businessData, policyNo, incidentId });
  if (response?.success) {
    yield put({
      type: 'saveLifeJClaim',
      payload: {
        klipCaseInfoList: response?.resultData,
        incidentId,
      },
    });
    bpm.buttonAction('save');
  } else {
    handleMessageModal(response.promptMessages, {
      cancelButtonProps: {
        style: {
          display: 'none',
        },
      },
    } as any);
  }
}
