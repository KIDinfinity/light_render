import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { ClaimType } from 'claim/enum';
import { PROCEDUREITEM } from '@/utils/claimConstant';

const addProcedureItem = (state: any, action: any) => {
  const { treatmentId, procedureId, changedValues } = action.payload;
  const nextState = produce(state, (draftState) => {
    const dateOfConsultation =
      draftState.claimEntities.treatmentListMap[treatmentId]?.dateOfConsultation;
    const treatmentType = draftState.claimEntities.treatmentListMap?.[treatmentId]?.treatmentType;
    const claimNo = draftState.claimProcessData?.claimNo;
    const id = procedureId || uuidv4();
    const consultationDate =
      formUtils.queryValue(treatmentType) === ClaimType.OPD
        ? formUtils.queryValue(dateOfConsultation)
        : null;
    const addProcedureItemInfo = {
      ...PROCEDUREITEM,
      claimNo,
      id,
      treatmentId,
      ...changedValues,
      operationDate: consultationDate,
    };

    if (!draftState.claimEntities.treatmentListMap[treatmentId].procedureList) {
      draftState.claimEntities.treatmentListMap[treatmentId].procedureList = [];
    }
    draftState.claimEntities.treatmentListMap[treatmentId].procedureList = [
      ...draftState.claimEntities.treatmentListMap[treatmentId].procedureList,
      addProcedureItemInfo.id,
    ];
    draftState.claimEntities.procedureListMap[addProcedureItemInfo.id] = addProcedureItemInfo;
  });

  return { ...nextState };
};

export default addProcedureItem;
