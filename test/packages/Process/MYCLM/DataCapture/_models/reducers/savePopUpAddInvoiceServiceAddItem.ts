import { produce } from 'immer';
import lodash from 'lodash';
import { ServiceCode } from 'claim/pages/Enum';
import { formUtils } from 'basic/components/Form';
import { getCurrentServiceItemNo } from 'claim/pages/utils/getCurrentServiceItemNo';
import { buildEmptyServiceItem, updateAmount } from '../functions/handlePopUp';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const addInvoiceItem = draftState.popUpAddInvoiceItem;
    const { treatmentNo, id }: any = lodash.pick(addInvoiceItem, ['treatmentNo', 'id']);
    const claimNo = draftState.claimProcessData?.claimNo;
    const newServiceItem = buildEmptyServiceItem({ claimNo, invoiceId: id });

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

    draftState.popUpAddInvoiceItem.serviceAddItem = {
      ...draftState.popUpAddInvoiceItem.serviceAddItem,
      ...changedFields,
    };
    if (lodash.has(changedFields, 'serviceItem')) {
      const serviceItemList = [
        ...draftState.popUpAddInvoiceItem.serviceItemList,
        draftState.popUpAddInvoiceItem.serviceAddItem,
      ];
      const totalExpenseAmount = updateAmount({
        itemList: formUtils.cleanValidateData(serviceItemList),
        targetField: 'expense',
      });
      const totalPaidAmount = updateAmount({
        itemList: formUtils.cleanValidateData(serviceItemList),
        targetField: 'otherInsurerPaidAmount',
      });
      draftState.popUpAddInvoiceItem = {
        ...draftState.popUpAddInvoiceItem,
        expense: totalExpenseAmount,
        otherInsurerPaidAmount: totalPaidAmount,
        serviceItemList,
      };
      draftState.popUpAddInvoiceItem.serviceAddItem = newServiceItem;
    }
  });
  return { ...nextState };
};
