import lodash from 'lodash';
import { findSuccessTemplateByGroupId } from '@/services/envoyReasonInfoControllerService';

const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export default function* (action: any, { call, put }: any) {
  const { param } = action?.payload;

  while (true) {
    const response = yield findSuccessTemplateByGroupId(param);
    const { resultInfoStatus, correspondenceResultInfoList } = lodash.pick(response.resultData, [
      'resultInfoStatus',
      'correspondenceResultInfoList',
    ]);
    if (resultInfoStatus === 'success') {
      if (!lodash.isEmpty(correspondenceResultInfoList)) {
        yield put({
          type: 'setSendCondition',
          payload: {
            sendConditionShow: true,
            resultInfoStatus: 'Success',
          },
        });
      }
      break;
    } else if (resultInfoStatus === 'fail') {
      yield put({
        type: 'setSendCondition',
        payload: {
          sendConditionShow: true,
          resultInfoStatus: 'Fail',
        },
      });
      break;
    }
    yield call(delay, 2000);
  }
}
