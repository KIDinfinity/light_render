import { produce } from 'immer';

const errorModalVisible = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.errorModal.visible = !state?.errorModal?.visible;
  });
  return { ...nextState };
};

export default errorModalVisible;
