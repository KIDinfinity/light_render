import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    id: string;
    changedFields: any;
    isLast: boolean;
  };
};

export default (state: any, action: TAction) => {
  const { id, changedFields, isLast } = action.payload;
  if (!id) return state;
  const nextState = produce(state, (draftState: any) => {
    const chosenIndex = draftState.modalData.policyReplacement.replacementInfoList.findIndex(
      (info: any) => info.id === id
    );
    if (chosenIndex > -1) {
      draftState.modalData.policyReplacement.replacementInfoList[chosenIndex] = {
        ...state.modalData.policyReplacement.replacementInfoList[chosenIndex],
        ...changedFields,
        isLast,
      };
    } else {
      draftState.modalData.policyReplacement.replacementInfoList.push({
        ...changedFields,
        isLast,
        id,
      });
    }
  });
  return { ...nextState };
};
