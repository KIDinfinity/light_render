import lodash from 'lodash';
import { searchAllCfgBranchCode } from '@/services/miscStandardBankControllerService';
import { tenant } from '@/components/Tenant';

export default function* (_: any, { call, put }: any) {
  const response = yield call(searchAllCfgBranchCode, {
    regionCode: tenant.region(),
  });
  if (lodash.isArray(response)) {
    yield put({
      type: 'setBranchCodeList',
      payload: {
        branchCodeList: response,
      },
    });
  }
  return response;
}
