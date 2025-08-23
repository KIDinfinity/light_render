import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { factoringHouseList } = lodash.pick(action?.payload, ['factoringHouseList']);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'factoringHouseList', factoringHouseList);
  });
  return {
    ...nextState,
  };
};
