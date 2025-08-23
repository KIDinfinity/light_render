import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { ServiceCode } from 'claim/pages/Enum';
import { getCurrentServiceItemNo } from 'claim/pages/utils/getCurrentServiceItemNo';
import { buildEmptyServiceItem, updateAmount } from '../functions/handlePopUp';

export default (state: any, action: any) => {
  const { invoiceId, serviceId, changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const claimNo = draftState.claimProcessData?.claimNo;
    const newPopUpInvoiceList = lodash.map(draftState.popUpInvoiceList, (invoiceItem: any) => {
      if (invoiceItem.id === invoiceId) {
        let serviceList = [];
        let totalExpenseAmount = invoiceItem?.expense;
        let totalPaidAmount = invoiceItem?.otherInsurerPaidAmount;
        const lastServiceId = lodash.last(invoiceItem?.serviceItemList)?.id;
        let serviceAddItem = invoiceItem?.serviceAddItem;
        serviceList = lodash.map(invoiceItem?.serviceItemList, (serviceItem: any) => {
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

        if (
          lodash.has(changedFields, 'serviceItem') &&
          serviceId === lastServiceId &&
          lodash.isEmpty(serviceAddItem)
        ) {
          serviceAddItem = buildEmptyServiceItem({
            claimNo,
            invoiceId,
          });
        }
        return {
          ...invoiceItem,
          expense: totalExpenseAmount,
          otherInsurerPaidAmount: totalPaidAmount,
          serviceItemList: serviceList,
          serviceAddItem,
        };
      }
      return { ...invoiceItem };
    });

    draftState.popUpInvoiceList = lodash.flatten(newPopUpInvoiceList);
  });
  return { ...nextState };
};
