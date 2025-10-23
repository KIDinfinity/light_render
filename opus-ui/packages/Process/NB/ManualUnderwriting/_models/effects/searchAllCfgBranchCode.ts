import { searchAllCfgBranchCode } from '@/services/miscStandardBankControllerService';
import { tenant } from '@/components/Tenant';

export default function* ({ payload }: any, { call, put }: any) {
  const response = yield call(searchAllCfgBranchCode, {
    regionCode: tenant.region(),
  });
  yield put({
    type: 'setBranchCodeList',
    payload: {
      branchCodeList: response,
    },
  });
  return response;
}
