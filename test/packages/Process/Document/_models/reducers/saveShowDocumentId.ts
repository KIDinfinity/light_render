import { produce }  from 'immer';
export default (state: any, action: any) => {
  const { showDocumentId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.showDocumentId = showDocumentId;
  });
  return { ...nextState };
};
