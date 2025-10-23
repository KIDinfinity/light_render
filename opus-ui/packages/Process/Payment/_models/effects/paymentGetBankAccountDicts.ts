import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import {
  searchByCodesAndRegionCode,
  searchByBranchCodesAndRegionCode,
} from '@/services/miscStandardBankControllerService';
import { filterBankCodes, updateBankNames } from '../_function';

export default function* getBankAccountDicts({ payload }: any, { select, put, call }: any) {
  const { claimData } = payload;

  const bankAccounts = lodash
    .chain(claimData?.payeeList)
    .map((item: any) => item.payeeBankAccountList)
    .flatten()
    .compact()
    .value();

  const regionCode = tenant.region();

  const bankCodes = filterBankCodes(bankAccounts, 'bankCode');

  const branchCodes = filterBankCodes(bankAccounts, 'branchCode');

  const { bankDicts, branchDicts } = yield select((state: any) => ({
    bankDicts: state.paymentAllocation.bankDicts,
    branchDicts: state.paymentAllocation.branchDicts,
  }));

  const bankCodesO = filterBankCodes(bankDicts, 'bankCode');

  const branchCodesO = filterBankCodes(branchDicts, 'branchCode');

  const result: any = { bankDicts, branchDicts };
  if (!lodash.isEmpty(bankCodes) && !lodash.isEqual(bankCodesO, bankCodes)) {
    //@ts-ignore
    const response = yield call(searchByCodesAndRegionCode, {
      codes: bankCodes,
      regionCode,
    });

    const { resultData, success } = lodash.pick(response, ['success', 'resultData']);
    if (success && resultData) {
      result.bankDicts = resultData;
      yield put({
        type: 'paymenSaveBankAccounts',
        payload: { bankDicts: resultData },
      });
    }
  }

  if (!lodash.isEmpty(branchCodes) && !lodash.isEqual(branchCodesO, branchCodes)) {
    //@ts-ignore
    const response = yield call(searchByBranchCodesAndRegionCode, {
      codes: branchCodes,
      regionCode,
    });

    const { resultData, success } = lodash.pick(response, ['success', 'resultData']);
    if (success && resultData) {
      result.branchDicts = resultData;
      yield put({
        type: 'paymenSaveBankAccounts',
        payload: { branchDicts: resultData },
      });
    }
  }
  const payeeList = updateBankNames(claimData?.payeeList, result);

  lodash.set(claimData, 'payeeList', payeeList);

  return claimData;
}
