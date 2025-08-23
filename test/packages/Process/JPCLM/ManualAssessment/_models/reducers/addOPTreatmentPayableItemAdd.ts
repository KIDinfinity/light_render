import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import moment from 'moment';
import { OPTREATMENTPAYABLE } from '@/utils/claimConstant';

const addOPTreatmentPayableItemAdd = (state: any, action: any) => {
  const { treatmentPayableId, incidentId, treatmentId, changedValues } = action?.payload;

  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;
    const opTreatmentPayableItemId = uuidv4();
    const opTreatmentItem = lodash
      .chain(draft.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList)
      .map((item) => ({
        ...item,
        outpatientTreatmentDate: moment(item.outpatientTreatmentDate).valueOf(),
      }))
      .find({ outpatientTreatmentDate: moment(changedValues?.dateOfConsultation).valueOf() })
      .value();

    if (!draft.claimEntities.treatmentPayableListMap[treatmentPayableId]?.opTreatmentPayableList) {
      draft.claimEntities.treatmentPayableListMap[treatmentPayableId].opTreatmentPayableList = [];
    }

    draft.claimEntities.treatmentPayableListMap[treatmentPayableId].opTreatmentPayableList = [
      ...draft.claimEntities.treatmentPayableListMap[treatmentPayableId].opTreatmentPayableList,
      opTreatmentPayableItemId,
    ];

    draft.claimEntities.opTreatmentPayableListMap[opTreatmentPayableItemId] = {
      ...OPTREATMENTPAYABLE,
      id: opTreatmentPayableItemId,
      claimNo: draftState.claimProcessData.claimNo,
      treatmentPayableId,
      incidentId,
      treatmentId,
      opTreatmentId: opTreatmentItem?.id,
      ...changedValues,
    };
  });

  return { ...nextState };
};

export default addOPTreatmentPayableItemAdd;
