import { produce } from 'immer';
import {
  summaryAmountToClaimDecision,
  // updatPolicyBenefitList,
  // updatPayeeList,
} from '../functions/claimPayableFunc';

const updatePayableAmountCallback = (state) => {
  // const {
  //   beneficiaryPayableTypeMap,
  //   policyBeneficiaryListMap,
  //   policyInsuredListMap,
  //   policyOwnerListMap,
  // } = state;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    const { claimProcessData, claimEntities } = draftState;
    // payableAmount逐级计算
    summaryAmountToClaimDecision(claimProcessData, claimEntities);
    // 更新保单受取人
    // updatPolicyBenefitList({
    //   claimProcessData,
    //   claimEntities,
    //   beneficiaryPayableTypeMap,
    //   policyBeneficiaryListMap,
    //   policyInsuredListMap,
    //   policyOwnerListMap,
    // });
    // 计算payeeList中每个人分配的收益金额
    // updatPayeeList(claimProcessData, claimEntities);
  });
  return { ...nextState };
};

export default updatePayableAmountCallback;
