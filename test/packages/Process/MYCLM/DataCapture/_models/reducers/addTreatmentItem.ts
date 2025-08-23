import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { TREATMENTITEM } from '@/utils/claimConstant';

const addTreatmentItem = (state: any, action: any) => {
  const { incidentId, changedValues } = action.payload;

  const nextState = produce(state, (draftState) => {
    const treatmentId = uuidv4();
    // const invoiceId = uuidv4();
    // const serviceItemId = uuidv4();
    const claimNo = draftState.claimProcessData?.claimNo;
    const treatmentList = draftState.claimEntities.incidentListMap?.[incidentId]?.treatmentList;
    let treatmentNo = 1;
    if (lodash.isArray(treatmentList)) {
      treatmentNo = treatmentList.length + 1;
    }

    const addTreatmentItemInfo = {
      ...TREATMENTITEM,
      claimNo,
      id: treatmentId,
      incidentId,
      invoiceList: [],
      treatmentNo,
      ...changedValues,
    };
    // const addInvoiceItem = {
    //   ...INVOICEITEM,
    //   claimNo,
    //   id: invoiceId,
    //   serviceItemList: [],
    //   treatmentId,
    //   exchangeDate: moment().format(),
    //   invoiceCurrency: tenant.currency(),
    // };
    // const addServiceItem = {
    //   ...SERVICEITEM,
    //   claimNo,
    //   id: serviceItemId,
    //   invoiceId,
    // };
    if (!draftState.claimEntities.incidentListMap[incidentId].treatmentList) {
      draftState.claimEntities.incidentListMap[incidentId].treatmentList = [];
    }
    draftState.claimEntities.incidentListMap[incidentId].treatmentList = [
      ...draftState.claimEntities.incidentListMap[incidentId].treatmentList,
      addTreatmentItemInfo.id,
    ];
    draftState.claimEntities.treatmentListMap[addTreatmentItemInfo.id] = addTreatmentItemInfo;
    // draftState.claimEntities.invoiceListMap[addInvoiceItem.id] = addInvoiceItem;
    // draftState.claimEntities.serviceItemListMap[addServiceItem.id] = addServiceItem;
  });

  return { ...nextState };
};

export default addTreatmentItem;
