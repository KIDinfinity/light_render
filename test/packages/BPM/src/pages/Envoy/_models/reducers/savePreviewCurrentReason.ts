import { produce } from 'immer';
import lodash from 'lodash';

export default function savePreviewCurrentReason(state: any, action: any) {
  return produce(state, (draftState: any) => {
    draftState.previewCurrentReason = lodash.get(action, 'payload.previewCurrentReason', []);
  });
}
