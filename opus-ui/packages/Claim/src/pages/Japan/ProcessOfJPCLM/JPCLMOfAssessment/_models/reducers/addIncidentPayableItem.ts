import { produce } from 'immer';

const addIncidentPayableItem = (state, action) => {
  const { addClaimPayableItem } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.incidentPayableAddItem = addClaimPayableItem;
  });

  return { ...nextState };
};

export default addIncidentPayableItem;
