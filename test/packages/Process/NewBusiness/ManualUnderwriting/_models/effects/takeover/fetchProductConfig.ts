import lodash from 'lodash';
import { getTakeOverInfoByPolicyId } from '@/services/owbNbCfgControllerService';

export default function* (
  {
    payload,
  }: {
    payload: {
      policyNo: string;
    };
  },
  { put, call, select }: any
) {
  const policyNo = lodash.get(payload, 'policyNo');
  // @ts-ignore
  const productConfig = yield select(
    (state: any) => state?.modalData?.takeOver?.productConfig?.[policyNo]
  );
  // 如果不存在，从api获取productConfig。
  if (!productConfig) {
    // @ts-ignore
    const businessNo = yield select((state: any) => state?.processData?.businessNo);
    // @ts-ignore
    const response = yield call(getTakeOverInfoByPolicyId, {
      policyId: policyNo,
      businessNo,
    });
    const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

    if (success) {
      yield put({
        type: 'setProductConfig',
        payload: {
          productConfig: resultData,
          policyNo,
        },
      });
    }
  }
}
