import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { valueIsEmpty } from '@/utils/claimUtils';
import { buildEmptyServiceItem } from '../functions/handlePopUp';

const updateAmount = ({ targetField, itemList }: any) => {
  let totalAmount = 0;
  lodash.map(itemList, (item) => {
    const targetValue = item[targetField];
    if (!valueIsEmpty(targetValue)) {
      totalAmount = add(totalAmount, formUtils.queryValue(targetValue));
    }
  });
  return totalAmount;
};

const removePopUpAddInvoiceService = (state: any, action: any) => {
  const { serviceId, invoiceId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const addItem = draftState.popUpAddInvoiceItem;
    const { serviceItemList }: any = lodash.pick(addItem, ['serviceItemList']);
    const claimNo = draftState.claimProcessData?.claimNo;
    const newServiceItem = buildEmptyServiceItem({ claimNo, invoiceId });
    const newServiceList = lodash.filter(serviceItemList, (item) => item?.id !== serviceId);
    const totalExpenseAmount = updateAmount({
      itemList: formUtils.cleanValidateData(newServiceList),
      targetField: 'expense',
    });

    const totalPaidAmount = updateAmount({
      itemList: formUtils.cleanValidateData(newServiceList),
      targetField: 'otherInsurerPaidAmount',
    });

    const newAddInvoice = {
      ...addItem,
      expense: totalExpenseAmount,
      otherInsurerPaidAmount: totalPaidAmount,
      serviceItemList: lodash.isEmpty(newServiceList) ? [newServiceItem] : newServiceList,
      serviceAddItem: lodash.isEmpty(newServiceList) ? {} : addItem.serviceAddItem,
    };
    draftState.popUpAddInvoiceItem = newAddInvoice;
  });

  return { ...nextState };
};

export default removePopUpAddInvoiceService;
