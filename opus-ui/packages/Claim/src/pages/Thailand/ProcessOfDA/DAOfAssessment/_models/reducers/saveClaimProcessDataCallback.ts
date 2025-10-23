import { produce } from 'immer';
import sumInvoiceExpense from 'claim/pages/utils/sumInvoiceExpense';
import { forEach } from 'lodash';
import type { ITreatment } from '@/dtos/claim';

const saveClaimProcessDataCallback = (state: any, _: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { invoiceListMap, treatmentListMap } = draftState.claimEntities;
    forEach(treatmentListMap, (treatment: ITreatment) => {
      const { id } = treatment;
      draftState.claimEntities.treatmentListMap[id] = {
        ...treatmentListMap[id],
        totalInvoiceNetExpense: sumInvoiceExpense(invoiceListMap, id),
      };
    });
  });

  return { ...nextState };
};

export default saveClaimProcessDataCallback;
