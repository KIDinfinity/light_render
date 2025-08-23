import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';
import { OTHERPROCEDUREITEMPAYABLE } from '@/utils/claimConstant';

const addOtherProcedurePayableItemAdd = (state: any, action: any) => {
  const { otherProcedureId, incidentId, treatmentId, changedValues } = action?.payload;

  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;

    draft.otherProcedurePayableItemAdd = {
      ...OTHERPROCEDUREITEMPAYABLE,
      otherProcedureId,
      incidentId,
      treatmentId,
      id: uuidv4(),
      ...changedValues,
    };
  });

  return { ...nextState };
};

export default addOtherProcedurePayableItemAdd;
