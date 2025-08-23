import { produce }  from 'immer';

const saveFurtherClaimRelationshipId = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.saveFurtherClaimRelationshipId = action.payload;
  });
  return { ...nextState };
};

export default saveFurtherClaimRelationshipId;
