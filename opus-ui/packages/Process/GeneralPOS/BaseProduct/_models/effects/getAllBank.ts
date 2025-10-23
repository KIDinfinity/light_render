import { serialize as objectToFormData } from 'object-to-formdata';
import { findAllByRegion } from '@/services/miscStandardBankControllerService';
import lodash from 'lodash';

export default function* (_, { call, put }: any) {
  const result = yield call(findAllByRegion, objectToFormData({})) || [];

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
