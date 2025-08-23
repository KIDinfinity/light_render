import { produce } from 'immer';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { TREATMENTPAYABLEITEM } from '@/utils/claimConstant';

const addTreatmentPayableItem = (state: any, action: any) => {
  const { incidentId, treatmentId, claimNo } = action.payload;

  const nextState = produce(state, (draftState) => {
    let expenseAmount = 0;
    const { invoiceList } = draftState.claimEntities.treatmentListMap[treatmentId];
    lodash.map(invoiceList, (invoiceId) => {
      const invoiceItem = draftState.claimEntities.invoiceListMap[invoiceId];
      expenseAmount = add(expenseAmount, formUtils.queryValue(invoiceItem.expense));
    });
    const payableAddItem = {
      ...TREATMENTPAYABLEITEM,
      claimNo,
      expenseAmount,
      id: uuidv4(),
      incidentId,
      treatmentId,
    };
    payableAddItem.systemCalculationAmount = 0;
    draftState.treatmentPayableAddItem = payableAddItem;
  });

  return { ...nextState };
};

export default addTreatmentPayableItem;
