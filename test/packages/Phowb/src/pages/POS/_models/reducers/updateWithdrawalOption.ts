import lodash from 'lodash';
import { produce }  from 'immer';

const updateWithdrawalOption = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const { partialWithdrawal } = draftState.claimProcessData.posDataDetail;

    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.posDataDetail.partialWithdrawal = {
      ...partialWithdrawal,
      fundList: lodash.map(partialWithdrawal.fundList, (item: any) => {
        return {
          ...item,
          withdrawPercentage: 0,
          withdrawNumberOfUnits: 0,
          withdrawAmount: 0,
          calculationAmount: 0,
        };
      }),
      totalWithdrawAmount: 0,
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default updateWithdrawalOption;
