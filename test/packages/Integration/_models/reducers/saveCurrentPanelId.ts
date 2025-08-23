import { produce } from 'immer';

const saveCurrentPanelId = (state: any, action: any) => {
  const { currentPanelId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.currentPanelId = currentPanelId;
  });
  return { ...nextState };
};

export default saveCurrentPanelId;
