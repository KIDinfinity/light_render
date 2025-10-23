import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { PayeeModal, PolicyBenefitModal, BeneficiaryModal }  from '../dto';
import { getPayeeDicts } from '../functions/paymentAllocation';

export default (state: any, { payload }: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const datas = draft.paymentModal.datas;
    const { payeeList, policyBenefitList } = datas;
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
