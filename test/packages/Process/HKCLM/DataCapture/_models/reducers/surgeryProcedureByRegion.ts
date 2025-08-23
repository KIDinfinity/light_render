import { produce }  from 'immer';

const surgeryProcedureByRegion = (state: any, { payload }: any) => {
  return produce(state, (draftState: any) => {
    draftState.surgeryProcedureByRegion = payload.surgeryProcedureByRegion;
  });
};

export default surgeryProcedureByRegion;
