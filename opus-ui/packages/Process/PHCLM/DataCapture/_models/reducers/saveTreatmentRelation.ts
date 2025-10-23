import { produce } from 'immer';

const saveTreatmentRelation = (state: any, { payload }: any) => {
  const { claimRelation } = payload;

  return produce(state, (draftState: any) => {
    const claimRelationTemp = { ...draftState.claimProcessData.claimRelation };

    draftState.claimProcessData.claimRelation = {
      ...claimRelationTemp,
      ...claimRelation,
    };
  });
};

export default saveTreatmentRelation;
