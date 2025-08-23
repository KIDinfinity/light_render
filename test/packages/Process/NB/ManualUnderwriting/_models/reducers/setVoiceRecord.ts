import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    voiceRecord: any;
  };
};

export default (state: any, action: TAction) => {
  const { voiceRecord } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.voiceRecord = voiceRecord;
  });
  return { ...nextState };
};
