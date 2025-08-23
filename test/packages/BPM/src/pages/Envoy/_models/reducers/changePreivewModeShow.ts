import { produce } from 'immer';
import lodash from 'lodash';

export default function changePreivewModeShow(state: any, action: any) {
  return produce(state, (draftState: any) => {
    draftState.previewModeShow = lodash.get(action, 'payload.show', false);
  });
}
