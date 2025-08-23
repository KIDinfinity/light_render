import { produce }  from 'immer';
import lodash from 'lodash';

const updateEnrolledPayOutOption = (state: any, action: any) => {
  const { accountNumber } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const { enrolledBankAccounts } = draftState.claimProcessData.posDataDetail.payOutOption;

    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.payOutOption.enrolledBankAccounts = lodash.map(
      lodash.compact(enrolledBankAccounts),
      (item: any) => {
        const check = item.accountNumber === accountNumber;
        return { ...item, check };
      }
    );

    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.payOutOption.newAccount = {
      check: false,
      payOutOption: '02',
      typeOfAccount: '01',
      currency: 'PHP',
    };
  });
  return { ...nextState };
};

export default updateEnrolledPayOutOption;
