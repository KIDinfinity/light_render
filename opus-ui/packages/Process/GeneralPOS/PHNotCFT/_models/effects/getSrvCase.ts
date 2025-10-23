import { getSrvCase } from '@/services/posSrvCaseInquiryControllerService';
import { queryCaseNo } from '@/services/navigatorCaseManagementControllerService';

export default function* getSrvData({ payload = {} }: any, { put, call }: any) {
  const { businessNo } = payload;
  // @ts-ignore
  const response = yield call(getSrvCase, {
    businessNo,
  });
  // @ts-ignore
  const caseNoResponse = yield call(queryCaseNo, {
    businessNo,
  });

  if (response && response?.success) {
    const businessData = response?.resultData?.businessData;
    const caseCategory = businessData?.caseCategory;
    yield put({
      type: `initBusinessData`,
      payload: {
        inquiryBusinessNo:businessNo,
        businessData:businessData,
        snapshotData: {},
        caseCategory: caseCategory,
        activityKey: 'BP_POS_ACT006',
        taskDefKey: 'BP_POS_ACT006',
        taskStatus: 'completed',
      },
    });
    yield put({
      type: `saveState`,
      payload: {
        isPOSHistory:true
      },
    });
    if (caseCategory) {
      yield put({
        type: `getTransactionTypeCodeMap`,
        payload: {
          caseCategory,
        },
      });
    }
  }
}
