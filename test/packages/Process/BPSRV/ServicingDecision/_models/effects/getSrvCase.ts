import { getSrvCase } from '@/services/posSrvCaseInquiryControllerService';
import { queryCaseNo } from '@/services/navigatorCaseManagementControllerService';


export default function* getSrvData({ payload = {} }: any, { put, call }: any) {
  const { businessNo } = payload;
  // @ts-ignore
  const response = yield call(getSrvCase, {
    businessNo
  });
  // @ts-ignore
  const caseNoResponse = yield call(queryCaseNo, {
    businessNo
  });

  if (response && response?.success) {
    const businessData = response?.resultData?.businessData;
    const caseCategory = businessData?.caseCategory;
    yield put({
      type: `saveClaimProcessData`,
      payload: {
        ...businessData,
        caseNo: caseNoResponse && caseNoResponse?.success && caseNoResponse?.resultData?.match?.(/\d+/g) ? caseNoResponse?.resultData : ''
      },
    });
    if (caseCategory) {
      yield put({
        type: `getTransactionTypeCodeMap`,
        payload: {
          caseCategory
        }
      });
    }
  }
}
