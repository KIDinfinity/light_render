import { produce } from 'immer';
import lodash from 'lodash';

const removePayeeInfoItem = (state: any, action: any) => {
  const { payeeId } = action.payload;
  const newPayeeList = lodash.filter(state.claimProcessData.payeeList, (item) => item !== payeeId);

  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.payeeList = newPayeeList;
    delete draftState.claimEntities.payeeListMap[payeeId];
  });

  return { ...nextState };
};

export default removePayeeInfoItem;
