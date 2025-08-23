import { produce }  from 'immer';
import lodash from 'lodash';

const savePosDateDetail = (state: any, action: any) => {
  const { policyInfo } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail = {
      ...policyInfo,
      fundList:
        lodash.isArray(policyInfo.fundList) &&
        lodash.map(policyInfo.fundList, (item: any) => {
          return {
            ...item,
            withdrawPercentage: 0,
            withdrawNumberOfUnits: 0,
            withdrawAmount: 0,
            calculationAmount: 0,
          };
        }),
      totalWithdrawAmount: 0,
      posDecision: {
        decisionCode: '01',
        declineReason: '',
      },
      payOutOption: {
        type: '02',
        bankCode: '01',
        bankOtherCode: '',
        branchCode: '',
        bankAccountName: '',
        bankAccountNo: '',
        typeOfAccount: '01',
        currency: '01',
        other: '',
      },
      usTaxDeclarations: {
        checked: 0,
        cardNo: '',
        identificationNumber: '',
        address: '',
      },
    };
  });
  return { ...nextState };
};

export default savePosDateDetail;
