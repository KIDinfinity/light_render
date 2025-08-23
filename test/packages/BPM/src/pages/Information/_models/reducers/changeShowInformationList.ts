import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const isShowInformationList = lodash.get(action, 'payload.isShowInformationList');
  const isShowAddBtn = lodash.get(action, 'payload.isShowAddBtn');
  const nextState = produce(state, (draftState: any) => {
    draftState.isShowInformationList = isShowInformationList;
    draftState.isShowAddBtn = isShowAddBtn;
  });
  return {
    ...nextState,
  };
};
