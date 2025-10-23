import { produce } from 'immer';
import lodash from 'lodash';
import type { PolicyBenefitModal, BeneficiaryModal } from '../dto';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { beneficiaryId, policyBenefitId } = payload;

    const { datas } = draft.paymentModal;
    const { policyBenefitList } = datas;

    draft.paymentModal.datas.policyBenefitList = lodash.map(
      policyBenefitList,
      (policyBenefit: PolicyBenefitModal) => {
        const policyBenefitTemp = { ...policyBenefit };
        const { id, beneficiaryList } = policyBenefitTemp;
        if (policyBenefitId === id) {
          policyBenefitTemp.beneficiaryList = lodash.filter(
            beneficiaryList,
            (beneficiary: BeneficiaryModal) => beneficiary.id !== beneficiaryId
          );
        }

        return policyBenefitTemp;
      }
    );
  });
};
