import { getNeedUpdateData } from '@/services/owbNbNbInquiryControllerService';
import bpm from 'bpm/pages/OWBEntrance';

export default function* (action: any, { call, select, put }: any): Generator<any, void, any> {
  const businessData = yield select((state: any) => state.processTask.getTask);
  const updateType = action?.payload?.updateType;

  const response = yield call(getNeedUpdateData, {
    businessNo: businessData?.businessNo,
    updateType,
  });

  if (response?.success) {
    yield put.resolve({
      type: 'saveBusinessDataUpdate',
      payload: { businessData: response.resultData.businessData, updateType },
    });

    bpm.buttonAction('save');
  }
}
