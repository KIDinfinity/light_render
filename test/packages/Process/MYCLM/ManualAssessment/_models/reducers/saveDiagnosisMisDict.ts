import { produce } from 'immer';

const saveDiagnosisMisDict = (state: any, { payload }: any) => {
  return produce(state, (draftState: any) => {
    draftState.dictsOfDiagnosis = payload;
  });
};

export default saveDiagnosisMisDict;
