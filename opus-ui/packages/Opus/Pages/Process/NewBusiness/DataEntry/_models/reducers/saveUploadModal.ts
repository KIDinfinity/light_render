import { produce } from 'immer';


const saveUploadModal = (state: any, action: any) => {
  const { openModal } = action.payload;
  const nextState = produce(state, (draftState) => {
    draftState.openModal = openModal;
  });
  
  return { ...nextState };
};

export default saveUploadModal;
