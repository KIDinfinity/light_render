import { produce } from 'immer';
import lodash from 'lodash';

export default function saveEnclosureData(state: any, action: any) {
  return produce(state, (draftState: any) => {
    draftState.previewEnclosure = {
      ...draftState.previewEnclosure,
      ...lodash.get(action, 'payload.previewEnclosure', {}),
    };
  });
}
