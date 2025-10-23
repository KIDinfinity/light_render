import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { PayeeModal, PolicyBenefitModal, BeneficiaryModal } from '../_dto/Models';
import { getPayeeDicts } from '../_function';

export default (state: any, { payload }: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { claimData } = draft;
    const { payeeList, policyBenefitList } = claimData;
    const { payeeId: payeeIdCur } = payload;

    const tempPolicyBenefitList: any[] = lodash
      .chain(policyBenefitList)
      .compact()
      .map((policyBenefit: PolicyBenefitModal) => {
        const { beneficiaryList } = policyBenefit;
        const beneficiaries = lodash
          .chain(beneficiaryList)
          .compact()
          .map((beneficiaryItem: BeneficiaryModal) => {
            const { payeeId } = beneficiaryItem;
            if (formUtils.queryValue(payeeId) === formUtils.queryValue(payeeIdCur)) {
              return { ...beneficiaryItem, payeeId: '' };
            }

            return beneficiaryItem;
          })
          .value();

        return { ...policyBenefit, beneficiaryList: beneficiaries };
      })
      .value();

    draft.paymentModal.datas.policyBenefitList = tempPolicyBenefitList;

    draft.paymentModal.datas.payeeList = lodash.filter(
      payeeList,
      (payee: PayeeModal) => payee.id !== formUtils.queryValue(payeeIdCur)
    );

    draft.paymentModal.payeeDicts = getPayeeDicts(draft.paymentModal.datas.payeeList);
  });
};
