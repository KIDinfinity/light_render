import { requestLifeJClaimId } from '@/services/claimJpLifejBoControllerService';
import { handleMessageModal } from '@/utils/commonMessage';
import bpm from 'bpm/pages/OWBEntrance';

export default function* getLifeJClaimId({ payload }: any, { call, select, put }: any) {
  const { policyNo, incidentId, businessData } = payload;

  const taskInfoBO = yield select(({ processTask }: any) => processTask.getTask || {});

  const response = yield call(requestLifeJClaimId, {
    businessData: { ...businessData, taskInfoBO },
    policyNo,
    incidentId,
  });
  if (response && response.success) {
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
