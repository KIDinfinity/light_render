import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { updateDuplicatePayableError } from '../functions';

const removeServicePayableItem = (state: any, action: any) => {
  const { invoicePayableItemId, serviceItemPayableItemId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const editPayable = formUtils.cleanValidateData(
      draftState.claimEntities.serviceItemPayableListMap[serviceItemPayableItemId]
    );
    updateDuplicatePayableError(
      draftState,
      {
        editPayable,
        benefitItemCode: editPayable.benefitItemCode,
      },
      'servicePayable'
    );
    const newServicePayableList = lodash.filter(
      draftState.claimEntities.invoicePayableListMap[invoicePayableItemId].serviceItemPayableList,
      (item) => item !== serviceItemPayableItemId
    );
    draftState.claimEntities.invoicePayableListMap[
      invoicePayableItemId
    ].serviceItemPayableList = newServicePayableList;
    delete draftState.claimEntities.serviceItemPayableListMap[serviceItemPayableItemId];
  });

  return { ...nextState };
};

export default removeServicePayableItem;
