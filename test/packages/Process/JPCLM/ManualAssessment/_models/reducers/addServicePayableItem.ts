import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { SERVICEPAYABLEITEM } from '@/utils/claimConstant';
import { SwitchEnum } from 'claim/pages/utils/claim';

const addServicePayableItem = (state: any, action: any) => {
  const { claimEntities } = state;
  const {
    serviceItemId,
    incidentId,
    treatmentId,
    invoiceId,
    claimNo,
    changedValues,
  } = action.payload;
  const serviceItem = claimEntities.serviceItemListMap[serviceItemId];
  const serviceItemValue = formUtils.cleanValidateData(serviceItem);

  const payableAddItem = {
    ...SERVICEPAYABLEITEM,
    calculationAmount: serviceItemValue.expense,
    claimNo,
    expenseAmount: serviceItemValue.expense,
    id: uuidv4(),
    incidentId,
    invoiceId,
    serviceItem: serviceItemValue.serviceItem,
    serviceItemId: serviceItemValue.id,
    treatmentId,
    manualAdd: SwitchEnum.YES,
    ...changedValues,
  };

  const nextState = produce(state, (draftState) => {
    payableAddItem.systemCalculationAmount = 0;
    draftState.servicePayableAddItem = payableAddItem;
  });

  return { ...nextState };
};

export default addServicePayableItem;
