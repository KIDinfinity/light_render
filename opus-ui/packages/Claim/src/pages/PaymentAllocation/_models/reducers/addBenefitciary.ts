import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { beneficiaryAssembly } from '../../_function';
import type { PolicyBenefitModal } from '../../_dto/Models';

export default (state: any, { payload }: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { benefitItem } = payload;
    const { claimData } = draft;

    const { policyBenefitList } = draft.claimData;

    draft.claimData.policyBenefitList = lodash.map(
      policyBenefitList,
      (policyBenefitItem: PolicyBenefitModal) => {
        if (
          formUtils.queryValue(policyBenefitItem.policyNo) ===
          formUtils.queryValue(benefitItem?.policyNo)
        ) {
          const policyBenefitTemp = { ...policyBenefitItem };
          const { beneficiaryList } = policyBenefitTemp;
          policyBenefitTemp.beneficiaryList = lodash
            .chain(beneficiaryList)
            .concat(beneficiaryAssembly(claimData, benefitItem))
            .compact()
            .value();

          return policyBenefitTemp;
        }

        return policyBenefitItem;
      }
    );
  });
};
