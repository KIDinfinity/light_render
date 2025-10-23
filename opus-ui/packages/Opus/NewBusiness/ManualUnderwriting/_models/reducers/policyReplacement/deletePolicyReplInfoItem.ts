import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    id: string;
  };
};

export default (state: any, action: TAction) => {
  const id = action.payload.id;
  if (!id) return state;
  const nextState = produce(state, (draftState: any) => {
    const chosenIndex = draftState.modalData.policyReplacement.replacementInfoList.findIndex(
      (info: any) => info.id === id
    );
    if (chosenIndex > -1) {
      draftState.modalData.policyReplacement.replacementInfoList.splice(chosenIndex, 1);
    }
  });
  return { ...nextState };
};
