import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { taskDetail } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    return lodash.set(draftState, 'taskDetail', taskDetail);
  });
  return {
    ...nextState,
  };
};
