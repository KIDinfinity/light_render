import { getAppealRelateCase } from '@/services/claimAppealClaimCaseService';
import { NAMESPACE } from '../../activity.config';
import { formUtils } from 'basic/components/Form';

export default function* (_, { call, put, select }: any) {
  const { claimAppealInfo, claimAppealRelateCaseInfo, claimAppealOriginalCase } = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );

  const originalInquiryClaimNo = formUtils.queryValue(claimAppealInfo?.originalInquiryClaimNo);
  if(!originalInquiryClaimNo)
    return

  const response = yield call(getAppealRelateCase, {
    originalInquiryClaimNo,
  });
  if (response.success) {
    if(response?.resultData?.length === 1) {
      if(!claimAppealOriginalCase) {
        yield put({
          type: 'loadCaseByCaseNo',
          payload: { selectedCaseInfo: response?.resultData[0] },
        });
      }
      response.resultData[0].selected = true;
    } else {
      const selectedCaseNo = claimAppealRelateCaseInfo?.caseNo;
      const selectedCase = response.resultData.find(({ caseNo }) => caseNo === selectedCaseNo)
      if(selectedCaseNo && selectedCase) {
        selectedCase.selected = true;
      }
    }
    yield put({
      type: 'saveCaseInfo',
      payload: { caseInfo: response?.resultData },
    });
  }
}

