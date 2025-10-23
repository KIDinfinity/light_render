import bpm from 'bpm/pages/OWBEntrance';
import { copyOriginalCase } from '@/services/claimAppealClaimCaseService';
import { NAMESPACE } from '../../activity.config';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { selectedCaseInfo } = payload || {};
  const { businessNo, inquiryBusinessNo } = yield select(({ processTask }: any) => processTask?.getTask) || {};

  const response = yield call(copyOriginalCase, { ...selectedCaseInfo, claimNo: businessNo, inquiryClaimNo: inquiryBusinessNo });
  const { claimAppealInfo, caseInfo } = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );

  if (response.success) {
    const claimProcessData = response.resultData;
    claimProcessData.claimAppealInfo = {
      ...claimProcessData.claimAppealInfo,
      ...claimAppealInfo
    };
    claimProcessData.caseInfo = caseInfo;
    yield put({
      type: 'saveClaimProcessData',
      payload: claimProcessData,
      updatePayables: true
    });
    const originalClaimNo = response.resultData?.claimAppealOriginalCase?.originalClaimNo;
    if(originalClaimNo) {
      yield put.resolve({
        type: `queryListPolicy`,
        payload: {
          claimNo: originalClaimNo,
        },
      });
    }
    yield bpm.buttonAction('save');

  } else {
    yield put({
      type: 'saveCaseInfo',
      payload: { caseInfo: caseInfo.map(caseDetail => ({
          ...caseDetail,
          selected: 0
        }))
      },
    })
  }
}

