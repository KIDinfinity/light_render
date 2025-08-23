import { produce } from 'immer';

const saveSerialTreatment = (state: any, { payload }: any) => {
  const { serialTreatments } = payload;

  return produce(state, (draftState: any) => {
    draftState.serialTreatments = serialTreatments;
  });
};

export default saveSerialTreatment;
