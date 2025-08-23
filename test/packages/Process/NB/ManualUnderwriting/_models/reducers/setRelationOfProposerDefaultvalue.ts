import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const relationOfProposerDefaultvalue = lodash.get(action, 'payload.relationOfProposerDefaultvalue','');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'relationOfProposerDefaultvalue', relationOfProposerDefaultvalue);
  });
  return { ...nextState };
};
