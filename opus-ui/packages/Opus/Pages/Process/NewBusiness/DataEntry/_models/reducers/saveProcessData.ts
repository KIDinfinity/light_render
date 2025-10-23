import { produce } from 'immer';
import initState from '../state';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const resultData = lodash.get(action, 'payload', {});
  const { businessData, ...taskDetail } = resultData;
  return produce(state, (draftState: any) => {
    lodash.set(draftState, 'processData', {
      ...initState.processData,
      ...businessData,
    });
    // lodash.set(draftState, 'taskDetail', taskDetail);
  });
};
