import { produce } from 'immer';

const sucessModalVisible = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.sucessModal.visible = !state?.sucessModal?.visible;
  });
  return { ...nextState };
};

export default sucessModalVisible;
