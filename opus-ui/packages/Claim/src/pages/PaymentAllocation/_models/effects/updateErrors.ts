import { formUtils } from 'basic/components/Form';
import { getBankAccountError } from '../../_function';

export default function* updateErrors(_: any, { select, put }: any) {
  const { claimData } = yield select((state: any) => ({
    ...state.paymentAllocation,
  }));
  const { policyBenefitList, payeeList } = claimData;
  const errors = formUtils.getErrorArray({ policyBenefitList, payeeList });
  const bankAccountErrors: any[] = getBankAccountError(claimData);

  const output = [...errors, ...bankAccountErrors];
  yield put({
    type: 'saveErrors',
    payload: {
      errors: output,
    },
  });

  return output;
}
