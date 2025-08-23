import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { addressLevel, parentCode, list } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    if (addressLevel !== 'country') {
      lodash.set(draftState, `parentCodeAddress.${addressLevel}.${parentCode}`, list);
    } else {
      lodash.set(
        draftState,
        'parentCodeAddress.country',
        lodash.chain(list).orderBy('subName').value()
      );
    }
  });
  return {
    ...nextState,
  };
};
