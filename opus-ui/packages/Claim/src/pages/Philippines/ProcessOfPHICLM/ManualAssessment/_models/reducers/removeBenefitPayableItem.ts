import { produce } from 'immer';
import lodash from 'lodash';

const removeBenefitPayableItem = (state: any, action: any) => {
  const { invoicePayableId, benefitPayableId } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    const benefitPayableList = lodash.get(
      draftState,
      `claimEntities.invoicePayableListMap.${invoicePayableId}.benefitItemPayableList`
    );
    draftState.claimEntities.invoicePayableListMap[
      invoicePayableId
    ].benefitItemPayableList = lodash.filter(
      benefitPayableList,
      (item) => item !== benefitPayableId
    );
    if (lodash.has(draftState.claimEntities.benefitItemPayableListMap, benefitPayableId)) {
      delete draftState.claimEntities.benefitItemPayableListMap[benefitPayableId];
    }
  });
  return { ...nextState };
};

export default removeBenefitPayableItem;
