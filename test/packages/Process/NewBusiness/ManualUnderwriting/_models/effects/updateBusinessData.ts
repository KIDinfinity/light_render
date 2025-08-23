import { getNeedUpdateData } from '@/services/owbNbNbInquiryControllerService';
import bpm from 'bpm/pages/OWBEntrance';

export default function* (_: any, { call, select, put }: any): Generator<any, void, any> {
  const businessData = yield select((state: any) => state.processTask.getTask);

  const response = yield call(getNeedUpdateData, {
    businessNo: businessData?.businessNo,
  });

  if (response?.success) {
    yield put.resolve({
      type: 'saveBusinessDataUpdate',
      payload: response.resultData,
    });

    bpm.buttonAction('save');
  }
}
