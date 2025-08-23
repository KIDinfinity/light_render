import { produce } from 'immer';
import lodash from 'lodash';

export default function savePreviewModeData(state: any, action: any) {
  return produce(state, (draftState: any) => {
    draftState.previewModeData = lodash.get(action, 'payload.prevewModeData', []);
    draftState.previewResolve =
      lodash.get(action, 'payload.previewResolve', null) || draftState.previewResolve;
    draftState.title = lodash.get(action, 'payload.title', null) || draftState.title;
  });
}
