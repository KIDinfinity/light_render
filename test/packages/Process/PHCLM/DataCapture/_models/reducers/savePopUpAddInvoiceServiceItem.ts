import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { valueIsEmpty } from '@/utils/claimUtils';
import { ServiceCode } from 'claim/pages/Enum';
import { getCurrentServiceItemNo } from 'claim/pages/utils/getCurrentServiceItemNo';
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

export default (state: any, action: any) => {
  const { serviceId, changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const addInvoiceItem = draftState.popUpAddInvoiceItem;
    const {
      serviceItemList,
      id,
      otherInsurerPaidAmount,
      expense,
      treatmentNo,
    }: any = lodash.pick(addInvoiceItem, [
      'serviceItemList',
      'id',
      'otherInsurerPaidAmount',
      'expense',
      'treatmentNo',
    ]);
    const claimNo = draftState.claimProcessData?.claimNo;
    const lastServiceId = lodash.last(serviceItemList)?.id;
    let totalExpenseAmount = expense;
    let totalPaidAmount = otherInsurerPaidAmount;
    const serviceAddItem = draftState.popUpAddInvoiceItem?.serviceAddItem;
    if (
      lodash.has(changedFields, 'serviceItem') &&
      serviceId === lastServiceId &&
      lodash.isEmpty(serviceAddItem)
    ) {
      draftState.popUpAddInvoiceItem.serviceAddItem = buildEmptyServiceItem({
        claimNo,
        invoiceId: id,
      });
    }

    if (
      lodash.has(changedFields, 'serviceItem') &&
      changedFields.serviceItem.value === ServiceCode.code
    ) {
      const treatmentId = lodash.find(draftState.claimEntities.treatmentListMap, { treatmentNo })
        ?.id;
      const procedureList = draftState.claimEntities.treatmentListMap[treatmentId]?.procedureList;

      const procedureListItem = lodash.map(procedureList, (procedureId: any) => {
        return draftState.claimEntities.procedureListMap[procedureId];
      });
      // 判断同一treatment下 当前的8.0.0Item是第几个
      const curServiceItemNo = getCurrentServiceItemNo({
        treatmentId,
        serviceItemListMap: draftState.claimEntities.serviceItemListMap,
        invoiceListMap: draftState.claimEntities.invoiceListMap,
      });
      const getDefaultClass =
        lodash.size(procedureList) > curServiceItemNo
          ? procedureListItem[curServiceItemNo]?.surgeryClass
          : lodash.first(procedureListItem)?.surgeryClass;
      changedFields.surgeryClass = getDefaultClass;
    }
    const serviceList = lodash.map(addInvoiceItem.serviceItemList, (serviceItem: any) => {
      if (serviceItem.id === serviceId) {
        return { ...serviceItem, ...changedFields };
      }
      return { ...serviceItem };
    });

    if (lodash.has(changedFields, 'expense')) {
      totalExpenseAmount = updateAmount({
        itemList: formUtils.cleanValidateData(serviceList),
        targetField: 'expense',
      });
    }
    if (lodash.has(changedFields, 'otherInsurerPaidAmount')) {
      totalPaidAmount = updateAmount({
        itemList: formUtils.cleanValidateData(serviceList),
        targetField: 'otherInsurerPaidAmount',
      });
    }

    const newAddInvoiceItem = {
      ...draftState.popUpAddInvoiceItem,
      expense: totalExpenseAmount,
      otherInsurerPaidAmount: totalPaidAmount,
      serviceItemList: serviceList,
    };

    draftState.popUpAddInvoiceItem = newAddInvoiceItem;
  });
  return { ...nextState };
};
