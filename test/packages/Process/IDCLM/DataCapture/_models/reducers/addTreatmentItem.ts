import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';
import { TREATMENTITEM } from '@/utils/claimConstant';

const addTreatmentItem = (state: any, action: any) => {
  const { incidentId, claimNo, treatmentType = '' } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const treatmentId = uuidv4();
    // const invoiceId = uuidv4();

    if (!draftState.claimEntities.incidentListMap[incidentId].treatmentList) {
      // eslint-disable-next-line no-param-reassign
      draftState.claimEntities.incidentListMap[incidentId].treatmentList = [];
    }
    // eslint-disable-next-line no-param-reassign
    draftState.claimEntities.incidentListMap[incidentId].treatmentList = [
      ...draftState.claimEntities.incidentListMap[incidentId].treatmentList,
      treatmentId,
    ];
    // eslint-disable-next-line no-param-reassign
    draftState.claimEntities.treatmentListMap[treatmentId] = {
      ...TREATMENTITEM,
      claimNo,
      id: treatmentId,
      incidentId,
      invoiceList: [],
      treatmentNo: 1,
      treatmentType,
    };
    // eslint-disable-next-line no-param-reassign
    // draftState.claimEntities.invoiceListMap[invoiceId] = {
    //   ...INVOICEITEM,
    //   claimNo,
    //   id: invoiceId,
    //   serviceItemList: [],
    //   treatmentId,
    //   exchangeDate: moment().format(),
    //   invoiceCurrency: tenant.currency(),
    // };
  });

  return { ...nextState };
};

export default addTreatmentItem;
