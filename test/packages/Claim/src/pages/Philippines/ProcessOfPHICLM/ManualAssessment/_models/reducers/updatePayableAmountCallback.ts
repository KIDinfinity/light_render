import { produce } from 'immer';
import lodash from 'lodash';
import {
  calculatPayableAmount,
  // updataPolicyBenefitList,
  // calculatBeneficiaryAmount,
  // calculatPaymentAmount,
} from '../functions/calculatPayableAmount';

const updatePayableAmountCallback = (state: any) => {
  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    const { claimPayableList } = draftState.claimProcessData;
    if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
      // payableAmount逐级计算
      calculatPayableAmount(draftState.claimProcessData, draftState.claimEntities);
      // 更新保单受取人
      // updataPolicyBenefitList(draftState.claimProcessData, draftState.claimEntities);
      // // 计算payeeList中每个人分配的收益金额
      // calculatBeneficiaryAmount(draftState.claimProcessData, draftState.claimEntities);
      // calculatPaymentAmount(draftState.claimProcessData, draftState.claimEntities);
    } else {
      draftState.claimProcessData.policyBenefitList = [];
      draftState.claimEntities.policyBenefitListMap = {};
      lodash.set(draftState, 'claimProcessData.claimDecision.claimPayableAmount', 0);
      lodash.set(draftState, 'claimProcessData.claimDecision.totalPayableAmount', 0);
      draftState.claimEntities.beneficiaryListMap = {};
    }
  });
  return { ...nextState };
};

export default updatePayableAmountCallback;
