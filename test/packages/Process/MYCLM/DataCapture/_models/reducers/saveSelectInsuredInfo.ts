import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { getSelectInsuredInfo, getPolicyOwnerInfo } from '../functions';

const saveSelectInsuredInfo = (state: any, action: any) => {
  const { clientInfoList, policyOwnerList, insuredId, policyId, policySource } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const { searchInsuredObj } = draftState;
    const newInsuredInfo = {
      ...getSelectInsuredInfo({
        clientInfoList,
        selectedClientId: insuredId,
        selectedPolicyId: policyId,
      }),
    };
    const oldInsuredId = draftState.claimProcessData.insured.insuredId;
    const newInsuredId = newInsuredInfo.insuredId;
    const draft = draftState;

    draft.claimProcessData.insured = {
      ...draftState.claimProcessData.insured,
      ...newInsuredInfo,
    };
    if (policySource) {
      draft.claimProcessData.insured.policySource = policySource;
    }
    // TODO 优化insured.policyId 的取值
    draft.claimProcessData.insured.policyId =
      formUtils.queryValue(draft.claimProcessData.insured.policyId) ||
      formUtils.queryValue(searchInsuredObj?.policyId);
    const policyOwnerInfo: any = getPolicyOwnerInfo(clientInfoList, policyOwnerList);

    // relationshipWithInsured=others时，不用改
    if (draft.claimProcessData.claimant.relationshipWithInsured !== 'T') {
      draft.claimProcessData.claimant = {
        ...policyOwnerInfo,
        relationshipWithInsured: relationshipWithInsuredForHK.policyOwner,
      };
    }
  });
  return { ...nextState };
};

export default saveSelectInsuredInfo;
