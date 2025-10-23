import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { list } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'countryList', lodash.chain(list).orderBy('subName').value());
  });
  return {
    ...nextState,
  };
};
