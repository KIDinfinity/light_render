import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const loanDetailList =
      draftState.businessData?.policyList?.[0].loanInfoList?.[0]?.loanDetailList || [];
    if (!lodash.isArray(draftState.businessData.policyList[0].loanInfoList)) {
      draftState.businessData.policyList[0].loanInfoList = [{ loanDetailList: [] }];
    }

    draftState.businessData.policyList[0].loanInfoList[0].loanDetailList = [
      ...loanDetailList,
      {
        id: uuidv4(),
        loanContractNumber: '',
        newLoanAmount: '',
        currency: '',
        period: '',
        numberOfPeriod: '',
        isNew: '',
      },
    ];
  });

  return {
    ...nextState,
  };
};
