import { produce } from 'immer';

const confirmationModalVisible = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.confirmationModal.visible = !state?.confirmationModal?.visible;
  });
  return { ...nextState };
};

export default confirmationModalVisible;
