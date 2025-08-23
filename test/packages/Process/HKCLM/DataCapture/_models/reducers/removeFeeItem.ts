import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import {
  updateServiceItemExpense,
  updateAmount,
  updateNetExpense,
} from '../functions/updateServiceItemExpense';

const removeFeeItem = (state: any, action: any) => {
  const { feeItemId, serviceItemId, invoiceId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const newFeeList = lodash.filter(
      draftState.claimEntities.serviceItemListMap[serviceItemId].feeItemList,
      (item) => item !== feeItemId
    );

    draftState.claimEntities.serviceItemListMap[serviceItemId].feeItemList = newFeeList;
    delete draftState.claimEntities.feeItemListMap[feeItemId];

    updateServiceItemExpense({ draftState, serviceItemId });
    updateAmount({
      targetField: 'expense',
      value: formUtils.queryValue(
        draftState.claimEntities.serviceItemListMap[serviceItemId].expense
      ),
      draftState,
      serviceItemId,
      invoiceId,
    });
    updateNetExpense({
      draftState,
      serviceItemId,
    });
  });

  return { ...nextState };
};

export default removeFeeItem;
