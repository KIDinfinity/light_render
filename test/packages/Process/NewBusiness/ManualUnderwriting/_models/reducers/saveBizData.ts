import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const resultData = lodash.get(action, 'payload.resultData', {});
  const { businessData, ...taskDetail } = resultData;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessData', businessData);
    lodash.set(draftState, 'taskDetail', taskDetail);
  });
  return {
    ...nextState,
  };
};
