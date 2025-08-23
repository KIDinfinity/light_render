import lodash from 'lodash';
import { searchAllCfgBankCode } from '@/services/miscStandardBankControllerService';
import { tenant } from '@/components/Tenant';

export default function* (_: any, { call, put }: any) {
  const response = yield call(searchAllCfgBankCode, {
    regionCode: tenant.region(),
  });
  if (lodash.isArray(response)) {
    yield put({
      type: 'setBankChannelList',
      payload: {
        bankChannelList: response,
      },
    });
  }
  return response;
}
