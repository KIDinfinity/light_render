import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { uwProposalAgent } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'uwProposalAgent', uwProposalAgent);
  });

  return { ...nextState };
};
