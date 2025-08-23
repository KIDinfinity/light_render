import lodash from 'lodash';
import { getDefaultValueByCode } from '@/services/owbNbCfgControllerService';

import { NAMESPACE } from '../../../activity.config';

export default function* ({ payload }: any, { call, put, select }: any) {
  const codeType = lodash.get(payload, 'codeType');
  const preResult = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.regionalDefaultValue?.[codeType]
  );
  if (preResult) {
    return;
  }

  const response = yield call(getDefaultValueByCode, {
    codeType,
  });
  if (response.success) {
    yield put({
      type: 'saveRegionalDefaultValue',
      payload: {
        codeType,
        defaultValue: response.resultData,
      },
    });
  }
}
