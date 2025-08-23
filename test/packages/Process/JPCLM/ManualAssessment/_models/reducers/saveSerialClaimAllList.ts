import { produce }  from 'immer';
import saveSerialClaimFilterList from './saveSerialClaimFilterList';

const saveSerialClaimAllList = (state: any, action: any) => {
  const { list } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.serialClaim.allList = list;
  });

  const newState = saveSerialClaimFilterList(nextState, {
    type: 'saveSerialClaimFilterList',
  });

  return { ...newState };
};

export default saveSerialClaimAllList;
