import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { INVOICEPAYABLEITEM } from '@/utils/claimConstant';
import { SwitchEnum } from 'claim/pages/utils/claim';

const addInvoicePayableItem = (state: any, action: any) => {
  const { claimEntities } = state;
  const { claimNo, incidentId, treatmentId, invoiceId } = action.payload;
  const invoiceItem = claimEntities.invoiceListMap[invoiceId];

  const payableAddItem = {
    ...INVOICEPAYABLEITEM,
    claimNo,
    expenseAmount: invoiceItem.expense,
    id: uuidv4(),
    incidentId,
    invoiceId,
    treatmentId,
    manualAdd: SwitchEnum.YES,
  };

  const nextState = produce(state, (draftState) => {
    payableAddItem.systemCalculationAmount = 0;
    draftState.invoicePayableAddItem = payableAddItem;
  });

  return { ...nextState };
};

export default addInvoicePayableItem;
