import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { ServiceCode } from 'claim/pages/Enum';
import { getCurrentServiceItemNo } from 'claim/pages/utils/getCurrentServiceItemNo';
import { buildEmptyServiceItem, updateAmount } from '../functions/handlePopUp';

export default (state: any, action: any) => {
  const { changedFields, invoiceId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const claimNo = draftState.claimProcessData?.claimNo;
    const newServiceItem = buildEmptyServiceItem({ claimNo, invoiceId });

    const newPopUpInvoiceList = lodash.map(draftState.popUpInvoiceList, (invoiceItem: any) => {
      if (invoiceItem.id === invoiceId) {
        let newInvoiceItem = invoiceItem;
        let newServiceAddItem = {};

        if (
          lodash.has(changedFields, 'serviceItem') &&
          changedFields.serviceItem.value === ServiceCode.code
        ) {
          const treatmentId = lodash.find(draftState.claimEntities.treatmentListMap, {
            treatmentNo: invoiceItem?.treatmentNo,
          })?.id;
          const procedureList =
            draftState.claimEntities.treatmentListMap[treatmentId]?.procedureList;

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

        newServiceAddItem = { ...invoiceItem.serviceAddItem, ...changedFields };
        if (lodash.has(changedFields, 'serviceItem')) {
          const newServiceList = [...newInvoiceItem.serviceItemList, newServiceAddItem];
          const totalExpenseAmount = updateAmount({
            itemList: formUtils.cleanValidateData(newServiceList),
            targetField: 'expense',
          });
          const totalPaidAmount = updateAmount({
            itemList: formUtils.cleanValidateData(newServiceList),
            targetField: 'otherInsurerPaidAmount',
          });
          newInvoiceItem = {
            ...newInvoiceItem,
            expense: totalExpenseAmount,
            otherInsurerPaidAmount: totalPaidAmount,
            serviceItemList: newServiceList,
          };
          newServiceAddItem = newServiceItem;
        }
        return {
          ...newInvoiceItem,
          serviceAddItem: newServiceAddItem,
        };
      }
      return { ...invoiceItem };
    });
    draftState.popUpInvoiceList = newPopUpInvoiceList;
  });
  return { ...nextState };
};
