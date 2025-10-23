import lodash from 'lodash';

import { getClaimInfoByNo } from '@/services/claimJpLifejBoControllerService';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';

export default function* ({ payload }: any, { put, call, select }: any): Generator<any, any, any> {
  const type = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      formUtils.cleanValidateData(modelnamespace?.businessData?.type) || {}
  );
  const response: any = yield call(getClaimInfoByNo, { ...payload, operationType: type });
  if (Boolean(response.success) === false) {
    handleErrorMessageIgnoreXErrorNotice(response);
    yield put({
      type: 'claimProcessDataResetByField',
      payload: {
        fields: Object.keys(payload),
      },
    });
    return true;
  }

  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response?.resultData)) {
    yield put({
      type: 'claimProcessDataAdd',
      payload: {
        datas: {
          ...response.resultData,
        },
      },
    });
    return true;
  }
  return false;
}
