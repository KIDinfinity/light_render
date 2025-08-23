import { findAllByRegionV2 } from '@/services/miscStandardBankControllerService';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { TransactionTypeEnum } from 'process/GeneralPOS/common/Enum';
import { tenant, Region } from '@/components/Tenant';

export default function* ({ payload }, { call, put }: any) {
  const transactionTypeCode = formUtils.queryValue(payload?.transactionTypeCode);
  const params = {};
  if (transactionTypeCode === TransactionTypeEnum.SRV110) {
    params.bankAccountType = 'DC';
  } else if (transactionTypeCode === TransactionTypeEnum.SRV041) {
    params.bankAccountType = 'ACA';
  } else if (transactionTypeCode === TransactionTypeEnum.SRV022 && tenant.region() === Region.PH) {
    params.bankAccountType = 'ADA';
  }
  const result = yield call(findAllByRegionV2, params) || [];

  if (lodash.isPlainObject(result) && result.success) {
    yield put({
      type: 'setAllBank',
      payload: {
        allBank: lodash.uniqBy(
          result?.resultData?.map((item) => ({
            dictCode: item.bankCode,
            dictName: `${item.bankCode} - ${item.bankName}`,
            name: item.bankName,
          })),
          'dictCode'
        ),
      },
    });
  }
}
