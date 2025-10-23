import { tenant } from '@/components/Tenant';
import { searchBankCode } from '@/services/miscStandardBankControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const response = yield call(searchBankCode, {
    params: { regionCode: tenant.region() },
    pageSize: 100,
  });
  if (response?.success && response?.resultData) {
    const { rows } = response.resultData;
    yield put({
      type: 'setbankCodeList',
      payload: {
        bankCodeList: rows,
      },
    });
    return rows;
  }
}
