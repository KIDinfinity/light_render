import { produce } from 'immer';
import lodash from 'lodash';
import { calculatPayableAmount } from '../functions/calculatPayableAmount';

const updatePayableAmountCallback = (state: any) => {
  // const { beneficiaryPayableTypeMap, policyBeneficiaryListMap, policyInsuredListMap } = state;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    const { claimPayableList } = draftState.claimProcessData;
    if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
      // payableAmount逐级计算
      calculatPayableAmount(draftState.claimProcessData, draftState.claimEntities);
      // 更新保单受取人
      // updataPolicyBenefitList(draftState.claimProcessData, draftState.claimEntities);
      // 计算payeeList中每个人分配的收益金额
      // const newClaimEntities = calculatPayeeBenefitAmount(
      //   updatPolicyBenefitListData.claimProcessData,
      //   updatPolicyBenefitListData.claimEntities
      // );
      // draftState.claimProcessData = updatPolicyBenefitListData.claimProcessData;
      // draftState.claimEntities = newClaimEntities;
    } else {
      draftState.claimProcessData.policyBenefitList = [];
      draftState.claimEntities.policyBenefitListMap = {};
      draftState.claimEntities.beneficiaryListMap = {};
    }
  });
  return { ...nextState };
};

export default updatePayableAmountCallback;
