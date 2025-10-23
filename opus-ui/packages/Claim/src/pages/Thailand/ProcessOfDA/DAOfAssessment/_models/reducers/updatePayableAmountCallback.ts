import { produce } from 'immer';
import lodash from 'lodash';
import {
  calculatPayableAmount,
  calculatPolicyBenefitListAmount,
} from '../functions/calculatPayableAmount';
import calculatPayable from '../functions/calculatPayable';

const updatePayableAmountCallback = (state: any) => {
  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    const { claimPayableList } = draftState.claimProcessData;
    if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
      // payableAmount逐级计算
      calculatPayableAmount(draftState.claimProcessData, draftState.claimEntities);
      // PolicyBenefitListAmount计算
      calculatPolicyBenefitListAmount(
        draftState.claimProcessData,
        draftState.claimEntities,
        draftState.listPolicy
      );
      calculatPayable({ claimEntities: draftState.claimEntities });
    } else {
      draftState.claimProcessData.policyBenefitList = [];
      draftState.claimEntities.policyBenefitListMap = {};
      draftState.claimEntities.beneficiaryListMap = {};
      draftState.claimProcessData.claimDecision = {
        ...draftState.claimProcessData.claimDecision,
        payToCustomer: 0,
        payToHospital: 0,
        assessmentDecision: 'D',
        totalPayableAmount: 0,
        claimPayableAmount: 0,
      };
    }
  });
  return { ...nextState };
};

export default updatePayableAmountCallback;
