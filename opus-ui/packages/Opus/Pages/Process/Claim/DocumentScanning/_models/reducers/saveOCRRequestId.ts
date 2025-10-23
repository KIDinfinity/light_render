import lodash from 'lodash'
import { produce } from 'immer';

export default (state, { payload }) => {
  const requestId  = lodash.clone(payload?.requestId) || null;

  const nextState = produce(state, (draftState: { uploadDocumentsModal: { ocrRequestId: any; }; }) => {
    draftState.uploadDocumentsModal.ocrRequestId = requestId
  });
  return { ...nextState };
};
