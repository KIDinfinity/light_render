import {
  searchByCodesAndRegionCode,
  searchByBankCodeAndBranchCodesAndRegionCode,
} from '@/services/miscStandardBankControllerService';
import { tenant } from '@/components/Tenant';

export default function* ({ payload }: any, { put, call }: any) {
  const regionCode = tenant.region();

  const { bankCode, branchCode, id, payeeId, seachCustom } = payload;

  const bankResponse = yield call(searchByCodesAndRegionCode, { codes: [bankCode], regionCode });
  const branchReponse = yield call(searchByBankCodeAndBranchCodesAndRegionCode, {
    codes: [branchCode],
    bankCode,
    regionCode,
  });

  const bankName = bankResponse?.resultData?.[0]?.bankName;
  const branchName = branchReponse?.resultData?.[0]?.branchName;
  yield put({
    type: 'paymenSaveBankAccount',
    payload: {
      changedFields: { branchName, bankName },
      id,
      payeeId,
      seachCustom,
    },
  });
}
