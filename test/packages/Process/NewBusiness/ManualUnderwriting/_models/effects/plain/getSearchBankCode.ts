import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { searchBankCode } from '@/services/miscStandardBankControllerService';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default function* (_: any, { select, call, put }: any) {
  const bankCodeList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.bankCodeList
  ) || [];
  if (lodash.isEmpty(bankCodeList)) {
    const response = yield call(searchBankCode, {
      params: { regionCode: tenant.region() },
      pageSize: 100,
    });
    if (
      lodash.isPlainObject(response) &&
      !!response?.success &&
      lodash.isArray(response?.resultData?.rows) &&
      !lodash.isEmpty(response?.resultData?.rows)
    ) {
      const { rows } = response.resultData;
      yield put({
        type: 'saveSeatchBankCodeList',
        payload: {
          searchBankCodeList: rows,
        },
      });
      return rows;
    }
  }
}
