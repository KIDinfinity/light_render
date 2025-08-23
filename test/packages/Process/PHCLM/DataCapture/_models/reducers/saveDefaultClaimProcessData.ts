import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { INCIDENTITEM, DIAGNOSISITEM } from '@/utils/claimConstant';
import { TREATMENTITEM, INVOICEITEM, SERVICEITEM } from '@/utils/claimConstant';
import moment from 'moment';
import { tenant } from '@/components/Tenant';

const saveDefaultClaimProcessData = (state: any, action: any) => {
  const nextState = produce(state, (draftState) => {
    // 如果incidentList为空，加一条incident和diagnosis
    if (lodash.isEmpty(draftState.claimProcessData.incidentList)) {
      const incidentId = uuidv4();
      const diagnosisId = uuidv4();
      const { claimNo } = draftState.claimProcessData;
      const addIncidentItem = {
        ...INCIDENTITEM,
        claimNo,
        diagnosisList: [],
        id: incidentId,
        incidentNo: 1,
      };
      const addDiagnosisItem = {
        ...DIAGNOSISITEM,
        claimNo,
        id: diagnosisId,
        incidentId,
      };
      draftState.claimProcessData.incidentList = [
        ...draftState.claimProcessData.incidentList,
        incidentId,
      ];

      draftState.claimEntities.incidentListMap[incidentId] = addIncidentItem;
      // draftState.claimEntities.diagnosisListMap[diagnosisId] = addDiagnosisItem;

      // 默认需要显示3层 ( incident - treatment - invoice)
      const treatmentId = uuidv4();
      const invoiceId = uuidv4();
      const serviceItemId = uuidv4();
      const treatmentNo = 1;
      const addTreatmentItem = {
        ...TREATMENTITEM,
        claimNo,
        id: treatmentId,
        incidentId,
        invoiceList: [invoiceId],
        treatmentNo,
      };
      const addInvoiceItem = {
        ...INVOICEITEM,
        claimNo,
        id: invoiceId,
        serviceItemList: [],
        treatmentId,
        exchangeDate: moment().format(),
        invoiceCurrency: tenant.currency(),
      };
      const addServiceItem = {
        ...SERVICEITEM,
        claimNo,
        id: serviceItemId,
        invoiceId,
      };

      if (!draftState.claimEntities.incidentListMap[incidentId].treatmentList) {
        draftState.claimEntities.incidentListMap[incidentId].treatmentList = [];
      }
      draftState.claimEntities.incidentListMap[incidentId].treatmentList = [
        ...draftState.claimEntities.incidentListMap[incidentId].treatmentList,
        addTreatmentItem.id,
      ];
      draftState.claimEntities.treatmentListMap[addTreatmentItem.id] = addTreatmentItem;
      draftState.claimEntities.invoiceListMap[addInvoiceItem.id] = addInvoiceItem;
      // draftState.claimEntities.serviceItemListMap[addServiceItem.id] = addServiceItem;
    }

    // 设置第一条incident展开
    draftState.incidentItemExpandStatus = {
      [`id_${draftState.claimProcessData.incidentList[0]}`]: true,
    };
  });

  return { ...nextState };
};

export default saveDefaultClaimProcessData;
