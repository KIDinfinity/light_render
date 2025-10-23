import lodash from 'lodash';
import {
  searchByCodesAndRegionCode,
  searchByBankCodeAndBranchCodesAndRegionCode,
} from '@/services/miscStandardBankControllerService';
import { tenant } from '@/components/Tenant';

export default function* ({ payload }: any, { put, call }: any) {
  const regionCode = tenant.region();
  const { paymentMethod } = payload;
  const premBankAccount = yield put.resolve({
    type: 'getPremBankAccount',
  });

  const bankCode = premBankAccount?.bankCode;
  const branchCode = premBankAccount?.branchCode;
  const bankResponse = yield call(searchByCodesAndRegionCode, { codes: [bankCode], regionCode });
  const branchReponse = yield call(searchByBankCodeAndBranchCodesAndRegionCode, {
    codes: [branchCode],
    bankCode,
    regionCode,
  });

  const payeeItem = lodash.pick(premBankAccount, [
    'bankCode',
    'bankAccountNo',
    'branchCode',
    'passbookCode',
    'passbookNo',
    'accountHolder',
    'bankType',
    'accountType',
  ]);

  const bankName = bankResponse?.resultData?.[0]?.bankName;
  const branchName = branchReponse?.resultData?.[0]?.branchName;
  yield put({
    type: 'payeeUpdate',
    payload: {
      changedFields: { ...payeeItem, branchName, bankName, paymentMethod },
      auto: true,
    },
  });
}
