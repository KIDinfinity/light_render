import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';
import { PROCEDUREITEMPAYABLE } from '@/utils/claimConstant';

const addProcedurePayableItemAdd = (state: any, action: any) => {
  const { procedureId, incidentId, treatmentId, changedValues } = action?.payload;

  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;
    draft.procedurePayableItemAdd = {
      ...PROCEDUREITEMPAYABLE,
      id: uuidv4(),
      procedureId,
      incidentId,
      treatmentId,
      ...changedValues,
    };
  });

  return { ...nextState };
};

export default addProcedurePayableItemAdd;
