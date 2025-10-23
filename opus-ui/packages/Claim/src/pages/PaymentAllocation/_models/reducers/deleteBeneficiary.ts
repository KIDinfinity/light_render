import { produce } from 'immer';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import {
  VLD_PayableBenefitAmount,
  VLD_MultiplePolicyOwner,
} from '../../_validators/sectionValidators';
import type { PolicyBenefitModal, BeneficiaryModal } from '../../_dto/Models';
import { updatePayoutAmount, getPolicyOwnerPayeeIds } from '../../_function';

export default (state: any, { payload }: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { claimData } = draft;
    const { policyBenefitList, claimPayableList } = claimData;
    const { policyBenefitId, beneficiaryId } = payload;

    draft.claimData.policyBenefitList = lodash.map(
      policyBenefitList,
      (policyBenefit: PolicyBenefitModal) => {
        let policyBenefitTemp = { ...policyBenefit };
        const { id, beneficiaryList } = policyBenefitTemp;
        if (policyBenefitId === id) {
          policyBenefitTemp.beneficiaryList = lodash.filter(
            beneficiaryList,
            (beneficiary: BeneficiaryModal) => beneficiary.id !== beneficiaryId
          );

          // 校验同一个保单号下面的payable amount和benefit amount总和是否相等
          policyBenefitTemp = tenant.region({
            [Region.PH]: policyBenefitTemp,
            notMatch: () => VLD_PayableBenefitAmount(policyBenefitTemp, claimPayableList),
          });
        }

        return policyBenefitTemp;
      }
    );

    draft.claimData.payeeList = updatePayoutAmount(
      draft.claimData.policyBenefitList,
      draft.claimData.payeeList
    );

    draft.relatePolicyOwnerPayeeIds = getPolicyOwnerPayeeIds(draft.claimData.policyBenefitList);
    draft.claimData.payeeList = VLD_MultiplePolicyOwner(
      draft.claimData.payeeList,
      draft.relatePolicyOwnerPayeeIds
    );
  });
};
