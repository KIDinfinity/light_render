import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { countrys } = lodash.pick(action?.payload, ['countrys']);

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'address.country', lodash.chain(countrys).orderBy('subName').value());
  });
  return {
    ...nextState,
  };
};
