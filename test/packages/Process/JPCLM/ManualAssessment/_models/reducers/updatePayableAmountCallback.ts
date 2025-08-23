import { produce }  from 'immer';
import lodash from 'lodash';
import { calculatPayableAmount } from '../functions/calculatPayableAmount';
import { changeClaimDecision } from '../functions/changeClaimDecision';


const updatePayableAmountCallback = (state: any) => {

  const nextState = produce(state, (draftState) => {
    const { claimProcessData } = draftState;
    const { claimPayableList } = claimProcessData;
    if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
      // payableAmount逐级计算
      calculatPayableAmount(draftState.claimProcessData, draftState.claimEntities);
      changeClaimDecision(draftState.claimEntities);
    } else {
      draftState.claimProcessData.claimDecision = {
        ...draftState.claimProcessData.claimDecision,
        totalPayableAmount: 0,
        claimPayableAmount: 0,
        exchangeRateRecord: null,
      };
      draftState.claimProcessData.policyBenefitList = [];
      draftState.claimEntities.policyBenefitListMap = {};
      draftState.claimEntities.beneficiaryListMap = {};
    }
  });
  return { ...nextState };
};

export default updatePayableAmountCallback;
