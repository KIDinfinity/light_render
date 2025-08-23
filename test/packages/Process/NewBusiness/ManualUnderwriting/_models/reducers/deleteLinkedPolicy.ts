import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { policyNoIndex } = payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.pullAt(draftState.policyNoList, policyNoIndex);
  });
  return { ...nextState };
};
