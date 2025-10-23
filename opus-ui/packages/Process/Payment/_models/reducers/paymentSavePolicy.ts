import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { PolicyBenefitModal } from '../_dto/Models';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { changedFields, policyNo } = payload;

    const { policyBenefitList } = draft.paymentModal.datas;

    draft.paymentModal.datas.policyBenefitList = lodash
      .chain(policyBenefitList)
      .compact()
      .map((policyBenefit: PolicyBenefitModal) => {
        if (formUtils.queryValue(policyBenefit.policyNo) === policyNo) {
          return { ...policyBenefit, ...changedFields };
        }
        return policyBenefit;
      })
      .value();
  });
};
