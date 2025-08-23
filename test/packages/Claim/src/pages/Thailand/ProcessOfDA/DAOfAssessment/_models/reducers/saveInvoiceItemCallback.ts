import { produce } from 'immer';
import sumInvoiceExpense from 'claim/pages/utils/sumInvoiceExpense';
import { has,size } from 'lodash';

const saveInvoiceItemCallback = (state: any, action: any) => {
  const { invoiceId, changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const { invoiceListMap } = draftState.claimEntities;
    const { treatmentId } = invoiceListMap[invoiceId];
    if (size(changedFields) > 1) return
    if (has(changedFields, 'expense')) {
      draftState.claimEntities.treatmentListMap[treatmentId] = {
        ...draftState.claimEntities.treatmentListMap[treatmentId],
        totalInvoiceNetExpense: sumInvoiceExpense(invoiceListMap, treatmentId),
      };
    }
  });

  return { ...nextState };
};

export default saveInvoiceItemCallback;
