import lodash from 'lodash';
import { produce } from 'immer';

const PayeeItemDelete = (state: any, { payload }: any) => {
  const { id } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    draftState.paymentModal.datas.payeeList = lodash.filter(
      draftState.paymentModal.datas.payeeList || [],
      (item: any) => item.id !== id
    );
    draftState.paymentModal.activePayeeId = draftState.paymentModal.datas.payeeList[0]?.id;
    draftState.paymentModal.datas.policyBenefitList = draftState.paymentModal.datas.policyBenefitList.map(
      (benefitItem) => ({
        ...benefitItem,
        beneficiaryList: benefitItem.beneficiaryList.filter(({ payeeId }) => payeeId !== id),
      })
    );
  });
  return { ...nextState };
};

export default PayeeItemDelete;
