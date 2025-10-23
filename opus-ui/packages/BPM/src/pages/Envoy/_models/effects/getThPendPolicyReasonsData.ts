import lodash from 'lodash';
import { getThPendPolicyReasons } from '@/services/bpmThPendPolicyReasonService';

interface IAction {
  payload: {
    reasonCode: string;
  };
}

export default function* getThPendPolicyReasonsData({ payload }: IAction, { select, call, put }: any) {
  const { reasonCode } = payload;
  const currretThPendPolicyReasons = yield select((state: any) =>
    lodash.get(state, `envoyController.thPendPolicyReasonInfo[${reasonCode}]`)
  );
  if (currretThPendPolicyReasons) return;
  const response = yield call(getThPendPolicyReasons, reasonCode);
  if (response && response.success) {
    yield put({
      type: 'saveThPendPolicyReasons',
      payload: {
        reasonCode,
        thPendPolicyReasons: response.resultData,
      },
    });
  }
};
