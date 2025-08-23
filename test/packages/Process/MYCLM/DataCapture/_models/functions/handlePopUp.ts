import { tenant } from '@/components/Tenant';
import { v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { valueIsEmpty } from '@/utils/claimUtils';
import lodash from 'lodash';
import { INVOICEITEM, SERVICEITEM } from '@/utils/claimConstant';

export const buildEmptyInvoice = ({ claimNo }: any) => {
  const invoiceId = uuidv4();
  const serviceItemId = uuidv4();
  const invoiceItem = {
    ...INVOICEITEM,
    claimNo,
    id: invoiceId,
    invoiceCurrency: tenant.currency(),
    isDeleted: false,
    serviceAddItem: {},
    treatmentNo: 1,
    serviceItemList: [{ ...SERVICEITEM, claimNo, id: serviceItemId, invoiceId, isDeleted: false }],
  };

  return invoiceItem;
};

export const buildEmptyServiceItem = ({ claimNo, invoiceId }: any) => {
  const serviceItemId = uuidv4();
  return { ...SERVICEITEM, claimNo, id: serviceItemId, invoiceId };
};

export const buildInvoiceItemList = ({ invoiceList, draftState, treatmentId }: any) => {
  lodash.forEach(invoiceList, (invoiceItem: any) => {
    const serviceIdList = lodash.map(invoiceItem.serviceItemList, (serviceItem) => serviceItem?.id);

    lodash.forEach(invoiceItem.serviceItemList, (serviceItem: any) => {
      draftState.claimEntities.serviceItemListMap[serviceItem.id] = serviceItem;
    });

    draftState.claimEntities.invoiceListMap[invoiceItem.id] = {
      ...invoiceItem,
      treatmentId,
      serviceItemList: serviceIdList,
    };
  });
};

export const buildTreatment = ({ incidentId, draftState, addTreatmentItem }: any) => {
  if (!draftState.claimEntities.incidentListMap[incidentId].treatmentList) {
    draftState.claimEntities.incidentListMap[incidentId].treatmentList = [];
  }
  draftState.claimEntities.incidentListMap[incidentId].treatmentList = [
    ...draftState.claimEntities.incidentListMap?.[incidentId].treatmentList,
    addTreatmentItem.id,
  ];
  draftState.claimEntities.treatmentListMap[addTreatmentItem.id] = addTreatmentItem;
};

export const removeEmptyInvoiceList = ({
  curTreatmentNoList,
  curInvoiceTreatmentNoList,
  draftState,
}: any) => {
  const differentList = lodash.difference(curTreatmentNoList, curInvoiceTreatmentNoList);
  if (!lodash.isEmpty(differentList)) {
    lodash.forEach(draftState.claimEntities.treatmentListMap, (treatmentItem: any) => {
      draftState.claimEntities.treatmentListMap[treatmentItem?.id].treatmentNo = lodash.toNumber(
        treatmentItem?.treatmentNo
      );
    });
    lodash.forEach(differentList, (treatmentItemNo: any) => {
      const treatmentItem = lodash.find(draftState.claimEntities.treatmentListMap, {
        treatmentNo: treatmentItemNo,
      });
      const invoiceItemIdList =
        draftState.claimEntities.treatmentListMap[treatmentItem?.id]?.invoiceList;
      if (!lodash.isEmpty(invoiceItemIdList)) {
        lodash.map(invoiceItemIdList, (invoiceId: any) => {
          const serviceItemIdList =
            draftState.claimEntities.invoiceListMap[invoiceId]?.serviceItemList;
          lodash.map(serviceItemIdList, (itemId) => {
            delete draftState.claimEntities.serviceItemListMap[itemId];
          });
          delete draftState.claimEntities.invoiceListMap[invoiceId];
        });
        draftState.claimEntities.treatmentListMap[treatmentItem.id].invoiceList = [];
      }
    });
  }
};

export const updateAmount = ({ targetField, itemList }: any) => {
  let totalAmount = 0;
  lodash.map(itemList, (item) => {
    const targetValue = item[targetField];
    if (!valueIsEmpty(targetValue)) {
      totalAmount = add(totalAmount, formUtils.queryValue(targetValue));
    }
  });
  return totalAmount;
};

export default {
  buildEmptyInvoice,
  buildEmptyServiceItem,
  buildInvoiceItemList,
  buildTreatment,
  removeEmptyInvoiceList,
  updateAmount,
};
