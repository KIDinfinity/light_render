import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const newRecordCollapseActiveKey = lodash.get(action, 'payload.newRecordCollapseActiveKey');
  const nextState = produce(state, (draftState: any) => {
    draftState.newRecordCollapseActiveKey = newRecordCollapseActiveKey;
  });
  return {
    ...nextState,
  };
};
