import { produce } from 'immer';
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

const removePopUpService = (state: any, action: any) => {
  const { invoiceId, serviceId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const invoiceList = draftState.popUpInvoiceList;
    const curInvoice = lodash.find(invoiceList, { id: invoiceId });
    const { serviceItemList, id }: any = lodash.pick(curInvoice, ['serviceItemList', 'id']);
    const serviceList = serviceItemList;
    const claimNo = draftState.claimProcessData?.claimNo;
    const newServiceItem = buildEmptyServiceItem({ claimNo, invoiceId: id });
    const newProcedureList = lodash.map(invoiceList, (invoiceItem) => {
      if (invoiceItem.id === invoiceId) {
        let newServiceList = [];
        newServiceList = lodash.filter(serviceList, (item) => item.id !== serviceId);

        const totalExpenseAmount = updateAmount({
          itemList: formUtils.cleanValidateData(newServiceList),
          targetField: 'expense',
        });
        // }

        const totalPaidAmount = updateAmount({
          itemList: formUtils.cleanValidateData(newServiceList),
          targetField: 'otherInsurerPaidAmount',
        });

        return {
          ...invoiceItem,
          expense: totalExpenseAmount,
          otherInsurerPaidAmount: totalPaidAmount,
          serviceItemList: lodash.isEmpty(newServiceList) ? [newServiceItem] : newServiceList,
          serviceAddItem: lodash.isEmpty(newServiceList) ? {} : invoiceItem.serviceAddItem,
        };
      }
      return invoiceItem;
    });
    draftState.popUpInvoiceList = newProcedureList;
  });

  return { ...nextState };
};

export default removePopUpService;
