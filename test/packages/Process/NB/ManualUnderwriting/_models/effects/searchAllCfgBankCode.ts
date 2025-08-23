import { searchAllCfgBankCode } from '@/services/miscStandardBankControllerService';
import { tenant } from '@/components/Tenant';

export default function* ({ payload }: any, { call, put }: any) {
  const response = yield call(searchAllCfgBankCode, {
    regionCode: tenant.region(),
  });
  yield put({
    type: 'setBankChannelList',
    payload: {
      bankChannelList: response,
    },
  });
  return response;
}
