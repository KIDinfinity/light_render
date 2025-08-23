import { produce } from 'immer';

const addBenefitPayableItem = (state: any, action: any) => {
  const { addBenefitPayableItem } = action.payload;
  const { invoicePayableId } = addBenefitPayableItem;
  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    if (!draftState.claimEntities.invoicePayableListMap[invoicePayableId].benefitItemPayableList) {
      draftState.claimEntities.invoicePayableListMap[invoicePayableId].benefitItemPayableList = [];
    }
    draftState.claimEntities.invoicePayableListMap[invoicePayableId].benefitItemPayableList = [
      ...draftState.claimEntities.invoicePayableListMap[invoicePayableId].benefitItemPayableList,
      addBenefitPayableItem.id,
    ];
    draftState.claimEntities.benefitItemPayableListMap[addBenefitPayableItem.id] = addBenefitPayableItem;
  });
  return { ...nextState };
};

export default addBenefitPayableItem;
