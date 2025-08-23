import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const clientInfoDraft = lodash.get(action, 'payload.clientInfoDraft', {});
  const nexteState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'clientInfoDraft', clientInfoDraft);
  });

  return nexteState;
};
