import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { waiverList } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'waiverProductsList', waiverList);
  });

  return { ...nextState };
};
