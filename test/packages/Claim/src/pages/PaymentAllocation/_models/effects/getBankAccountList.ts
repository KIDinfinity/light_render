import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { getClaimBankAccount } from '@/services/claimBankAccountControllerService';

export default function* getBankAccountList({ payload }: any, { call, select, put }: any) {
  const { claimData = {} } = payload;
  const { taskNotEditable } = yield select(
    ({ claimEditable }: any) => claimEditable.taskNotEditable
  );

  if (taskNotEditable) return claimData?.c360BeneficiaryInfo;

  const claimNo = lodash.get(claimData, 'claimNo');
  const param = { claimNo };

  const response = yield call(getClaimBankAccount, objectToFormData(param));
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && resultData) {
    yield put({
      type: 'saveBankAccountList',
      payload: {
        bankAccountList: resultData,
      },
    });
  }

  return {};
}
