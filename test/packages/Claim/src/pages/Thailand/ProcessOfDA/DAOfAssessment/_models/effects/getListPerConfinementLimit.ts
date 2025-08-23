import { serialize as objectToFormData } from 'object-to-formdata';
import { listThRolloverLimit } from '@/services/claimInsuredPolicyControllerService';

export default function* getListPerConfinementLimit({}: any, { call, put, select }: any) {
  const claimNo = yield select((state: any) => state?.processTask?.getTask?.businessNo);
  const response = yield call(
    listThRolloverLimit,
    objectToFormData({
      claimNo,
    })
  );

  if (response.success && response.resultData) {
    yield put({
      type: 'saveListPerConfinementLimit',
      payload: {
        listPerConfinementLimit: response?.resultData,
      },
    });
  }
}
