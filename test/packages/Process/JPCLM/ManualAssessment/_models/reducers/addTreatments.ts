import { produce }  from 'immer';
import lodash from 'lodash';
import { TREATMENTITEM } from '@/utils/claimConstant';
import {v4 as uuidv4 } from 'uuid';
import EIsAdjustment from 'process/JPCLM/ManualAssessment/_models/enum/isAdjustment';

const addTreatmentItem = ({ draftState, incidentId, treatmentId, item }: any) => {
  const claimNo = draftState?.claimProcessData?.claimNo;
  const treatmentList = draftState.claimEntities?.incidentListMap?.[incidentId].treatmentList;
  let treatmentNo = 1;
  if (lodash.isArray(treatmentList)) {
    treatmentNo = treatmentList.length + 1;
  }

  const id = uuidv4();

  const addTreatmentItemInit = {
    ...TREATMENTITEM,
    ...lodash.pick(item, lodash.keys(TREATMENTITEM)),
    claimNo,
    id,
    adjustmentTreatmentId: treatmentId,
    incidentId,
    treatmentNo,
    isAdjustment: EIsAdjustment.Y,
  };

  addTreatmentItemInit.opTreatmentList = lodash.map(item?.outpatientTreatmentDateList, (item) => ({
    outpatientTreatmentDate: item,
    id: uuidv4(),
    treatmentId: id,
  }));

  if (!draftState.claimEntities.incidentListMap[incidentId].treatmentList) {
    draftState.claimEntities.incidentListMap[incidentId].treatmentList = [];
  }
  draftState.claimEntities.incidentListMap[incidentId].treatmentList = [
    ...draftState.claimEntities.incidentListMap[incidentId].treatmentList,
    addTreatmentItemInit.id,
  ];

  draftState.claimEntities.treatmentListMap[addTreatmentItemInit.id] = addTreatmentItemInit;
};

const addTreatments = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { incidentId, records } = draftState?.saveFurtherClaimRelationshipId;
    const treatmentList = draftState.claimEntities?.incidentListMap?.[incidentId]?.treatmentList;
    const adjustmentTreatmentList = lodash.map(
      treatmentList,
      (id) => draftState.claimEntities?.treatmentListMap?.[id]?.adjustmentTreatmentId
    );

    const addTreatmentLists = lodash.filter(records, (item: any) => {
      return !lodash.includes(adjustmentTreatmentList, item?.id);
    });

    lodash.map(addTreatmentLists, (item: any) => {
      addTreatmentItem({ draftState, incidentId, treatmentId: item?.treatmentId, item });
    });
    setTimeout(() => {
      draftState.saveFurtherClaimRelationshipId = {};
    }, 100);
  });

  return { ...nextState };
};

export default addTreatments;
