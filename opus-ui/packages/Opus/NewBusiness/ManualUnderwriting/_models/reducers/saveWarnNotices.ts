import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { warnNotices } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.warnNotices = lodash.isArray(warnNotices) ? warnNotices : [];
  });
  return {
    ...nextState,
  };
};
