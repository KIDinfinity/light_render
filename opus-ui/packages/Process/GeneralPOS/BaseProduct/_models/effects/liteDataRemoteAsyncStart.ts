import lodash from 'lodash';
import { asyncRequestExternalCase } from '@/services/posSrvExternalCaseControllerService';

interface IResult {
  success: boolean;
  resultData: object;
}

export default function* liteDataRemoteAsyncStart({ payload }: any, { put, call, select }: any) {
  const { processInstanceId } = yield select(({ processTask }: any) => processTask.getTask) || {};
  yield put({
    type: 'clear',
    payload: {
      whiteObject: {
        inquiryBusinessNo: payload?.inquiryBusinessNo,
      },
    },
  });

  const result: IResult = yield call(asyncRequestExternalCase, {
    liteCaseNo: payload?.inquiryBusinessNo,
    caseNo: processInstanceId,
  });

  if (lodash.isPlainObject(result) && result.success) {
    return {
      result: true,
      data: result.resultData,
    };
  }
  return { result: false };
}
