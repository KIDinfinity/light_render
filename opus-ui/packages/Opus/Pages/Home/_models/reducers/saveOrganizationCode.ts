import { produce } from 'immer';
import { getActivityList } from 'opus/Utils';

export default (state: any, action: any) => {
  const { organizationCode } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const { activityList, owner } = getActivityList({
      organizationCode,
      organizationList: state.organizationList,
    });
    draftState.owner = owner;
    draftState.organizationCode = organizationCode;
    draftState.activityList = activityList;
  });
  return { ...nextState };
};
