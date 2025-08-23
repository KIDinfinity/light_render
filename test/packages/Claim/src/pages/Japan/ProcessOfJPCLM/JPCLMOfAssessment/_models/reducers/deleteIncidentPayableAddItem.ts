import { produce } from 'immer';
// import { deleteErrorMessages } from '../functions';

const deleteIncidentPayableAddItem = (state) => {
  const nextState = produce(state, (draftState) => {
    // deleteErrorMessages.delClaimPayablePolicy(
    //   draftState.claimEntities.claimPayableListMap,
    //   draftState.incidentPayableAddItem.id
    // );
    draftState.incidentPayableAddItem = null;
  });

  return { ...nextState };
};

export default deleteIncidentPayableAddItem;
