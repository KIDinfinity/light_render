import { produce } from 'immer';
import lodash from 'lodash';

export default function handleBatchEnvoySelect(state: any, action: any) {
  return produce(state, (draftState: any) => {
    lodash.set(
      draftState,
      'batchEnvoySelected',
      lodash.get(action, 'payload.batchEnvoySelected', [])
    );
  });
}
