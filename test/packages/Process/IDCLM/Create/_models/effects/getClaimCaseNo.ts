// @ts-ignore
import { saga } from 'dva';
import bpmBusinessProcessService from '@/services/bpmBusinessProcessService';
import { serialize as objectToFormData } from 'object-to-formdata';

let count = 20;
let initTime: number;
const { delay } = saga;
export default function* getClaimCaseNo({ payload }: any, { call, put }: any) {
  if (count === 20) initTime = new Date().valueOf();
  const response = yield call(bpmBusinessProcessService.getClaimCaseNo, objectToFormData(payload));
  const currentTime = new Date().valueOf();
  count -= 1;
  if (
    !response.success &&
    !response.resultData &&
    count > 0 &&
    currentTime - initTime < 2 * 60000 &&
    count > 0
  ) {
    yield delay(5000);
    return yield put.resolve({
      type: 'getClaimCaseNo',
      payload,
    });
  }
  return response;
}
