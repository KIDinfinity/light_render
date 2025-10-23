import { produce } from 'immer';

const followUpTaskDelete = (state: any, action: any) => {
  const { index } = action.payload;

  const { businessData } = state;

  const nextState = produce(state, (draftState: any) => {
    const followUpInfoList = businessData.followUpInfoList?.slice();
    followUpInfoList.splice(index, 1);

    draftState.businessData.followUpInfoList = followUpInfoList;
  });

  return { ...nextState };
};

export default followUpTaskDelete;
