import { produce } from 'immer';
import lodash from 'lodash';
import { TREATMENTITEM } from '@/utils/claimConstant';
import { v4 as uuidv4 } from 'uuid';

const addTreatment = (state: any, action: any) => {
  const { incidentId } = action?.payload || {};
  const nextState = produce(state, (draftState: any) => {
    const claimNo = draftState?.claimProcessData?.claimNo;
    const treatmentList = draftState.claimEntities?.incidentListMap?.[incidentId].treatmentList;
    let treatmentNo = 1;
    if (lodash.isArray(treatmentList)) {
      treatmentNo = treatmentList.length + 1;
    }

    const id = uuidv4();

    const addTreatmentItemInit = {
      ...TREATMENTITEM,
      claimNo,
      id,
      incidentId,
      treatmentNo,
      // isAdjustment: EIsAdjustment.Y,
    };

    if (!draftState.claimEntities.incidentListMap[incidentId].treatmentList) {
      draftState.claimEntities.incidentListMap[incidentId].treatmentList = [];
    }
    draftState.claimEntities.incidentListMap[incidentId].treatmentList = [
      ...draftState.claimEntities.incidentListMap[incidentId].treatmentList,
      addTreatmentItemInit.id,
    ];

    draftState.claimEntities.treatmentListMap[addTreatmentItemInit.id] = addTreatmentItemInit;
  });

  return { ...nextState };
};

export default addTreatment;
