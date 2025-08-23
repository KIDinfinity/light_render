import lodash from 'lodash';
import { produce } from 'immer';

const PayeeItemDelete = (state: any, { payload }: any) => {
  const { id } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    draftState.claimData.payeeList = lodash.filter(
      draftState.claimData.payeeList || [],
      (item: any) => item.id !== id
    );
    draftState.activePayeeId = draftState.claimData.payeeList[0]?.id;
    draftState.claimData.policyBenefitList = draftState.claimData.policyBenefitList.map(
      (benefitItem) => ({
        ...benefitItem,
        beneficiaryList: benefitItem.beneficiaryList.filter(({ payeeId }) => payeeId !== id),
      })
    );
  });
  return { ...nextState };
};

export default PayeeItemDelete;
