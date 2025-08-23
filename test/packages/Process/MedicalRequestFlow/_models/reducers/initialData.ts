import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const businessData = lodash.get(action, 'payload.businessData');
  const taskDetail = lodash.get(action, 'payload.taskDetail');
  const nextState = produce(state, (draftState: any) => {
    if (!lodash.isEmpty(businessData)) {
      lodash.set(draftState, 'businessData', businessData);
      lodash.set(draftState, 'taskDetail', taskDetail);
    }
  });
  return {
    ...nextState,
  };
};
