import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { addressSubList, parentCode, addressLevel } = lodash.pick(action?.payload, [
    'addressLevel',
    'parentCode',
    'addressSubList',
  ]);
  const nextState = produce(state, (draftState: any) => {
    if (addressLevel !== 'country') {
      lodash.set(draftState, `address.${addressLevel}.${parentCode}`, addressSubList);
    }
  });
  return {
    ...nextState,
  };
};
