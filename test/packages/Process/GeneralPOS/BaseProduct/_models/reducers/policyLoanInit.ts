/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, policyLoan } = payload;
    const policyLoanPath = `entities.transactionTypesMap[${transactionId}].policyLoan`;
    lodash.set(draftState, `${policyLoanPath}`, {
      ...policyLoan,
      loanAmountRequired:
        formUtils.queryValue(policyLoan?.loanRequest) === 'partialAmt'
          ? policyLoan?.payableAmount
          : policyLoan?.loanAvailableAmt,
    });
  });
