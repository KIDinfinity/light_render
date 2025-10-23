import lodash from 'lodash';
import { searchBankAndBranchByRegionCode } from '@/services/miscStandardBankControllerService';

export default function* (_, { call, put }: any) {
  const response = yield call(searchBankAndBranchByRegionCode);
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const brankList = lodash.get(response, 'resultData');
    yield put({
      type: 'saveBrankList',
      payload: {
        brankList,
      },
    });
  }
  return response;
}
