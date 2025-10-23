import { findByRegionAndBankCode } from '@/services/miscStandardBankControllerService';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

export default function* ({ payload }, { call, put, select }: any) {
  const { bankCode } = payload;

  const bankBranchByCodeMap = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.bankBranchByCodeMap
  );

  if (!lodash.isEmpty(bankBranchByCodeMap?.[bankCode])) {
    return;
  }
  const result = yield call(findByRegionAndBankCode, { bankCode }) || [];

  if (lodash.isPlainObject(result) && result.success) {
    yield put({
      type: 'setBankBranchByCodeMap',
      payload: {
        code: bankCode,
        list: lodash.uniqBy(
          result?.resultData?.map((item) => ({
            dictCode: item.branchCode,
            dictName: `${item.branchCode} - ${item.branchName}`,
            name: item.branchName,
          })),
          'dictCode'
        ),
      },
    });
  }
}
