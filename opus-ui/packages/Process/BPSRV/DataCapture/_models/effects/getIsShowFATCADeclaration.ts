import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { getGlobalConfig } from '@/services/miscGlobalConfigControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const response = yield call(getGlobalConfig, {
    "application": "pos",
    "codeType": "SrvFatcaInfo",
    "region": lodash.toLower(tenant.region())
  });
  const defaultValue = lodash.get(response, 'resultData[0].defaultValue');

  yield put.resolve({
    type: 'setIsShowFATCADeclaration',
    payload: {
      isShowFATCADeclaration: defaultValue,
    },
  });
}
