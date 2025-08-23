import { produce } from 'immer';
import { SwitchEnum } from 'claim/pages/utils/claim';

const addBenefitPayableItem = (state: any, action: any) => {
  const { addBenefitPayableItem } = action.payload;
  const { invoicePayableId } = addBenefitPayableItem;
  addBenefitPayableItem.manualAdd = SwitchEnum.YES;
  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    if (!draftState.claimEntities.invoicePayableListMap[invoicePayableId].benefitItemPayableList) {
      draftState.claimEntities.invoicePayableListMap[invoicePayableId].benefitItemPayableList = [];
    }
    draftState.claimEntities.invoicePayableListMap[invoicePayableId].benefitItemPayableList = [
      ...draftState.claimEntities.invoicePayableListMap[invoicePayableId].benefitItemPayableList,
      addBenefitPayableItem.id,
    ];
    draftState.claimEntities.benefitItemPayableListMap[
      addBenefitPayableItem.id
    ] = addBenefitPayableItem;
  });
  return { ...nextState };
};

export default addBenefitPayableItem;
