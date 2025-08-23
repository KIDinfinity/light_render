import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { OTHERPROCEDUREITEM } from '@/utils/claimConstant';

const otherProcedureAdd = (state: any, action: any) => {
  const { treatmentId, changedValues, otherProcedureId = '' }: any = action.payload;
  const nextState = produce(state, (draftState: any) => {
    if (!draftState.claimEntities.treatmentListMap[treatmentId].otherProcedureList) {
      draftState.claimEntities.treatmentListMap[treatmentId].otherProcedureList = [];
    }
    const claimNo = draftState.claimProcessData?.claimNo;
    const id = otherProcedureId || uuidv4();
    const addOtherProcedureItem = {
      ...OTHERPROCEDUREITEM,
      id,
      treatmentId,
      claimNo,
      procedureType: changedValues?.therapiesType,
    };
    draftState.claimEntities.treatmentListMap[treatmentId].otherProcedureList = [
      ...draftState.claimEntities.treatmentListMap[treatmentId].otherProcedureList,
      addOtherProcedureItem.id,
    ];
    draftState.claimEntities.otherProcedureListMap[
      addOtherProcedureItem.id
    ] = addOtherProcedureItem;
  });

  return { ...nextState };
};

export default otherProcedureAdd;
