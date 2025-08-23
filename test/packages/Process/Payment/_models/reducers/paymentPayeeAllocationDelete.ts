import { produce } from 'immer';

const payeeAllocationDelete = (state: any, action: any) => {
  const { benefitItemId, id } = action?.payload || {};

  return produce(state, (draftState: any) => {
    const benefitItem = draftState.paymentModal.datas.policyBenefitList?.find(
      (benefitItem) => benefitItem.id === benefitItemId
    );
    benefitItem.beneficiaryList = benefitItem.beneficiaryList.filter(
      (beneficiary) => beneficiary.id !== id
    );
  });
};

export default payeeAllocationDelete;
