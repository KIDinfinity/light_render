import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { list } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'productCodeList', lodash.chain(list).value());
  });
  
  return {
    ...nextState,
  };
};
