import { produce } from 'immer';

export default (state: any, { payload }) => {
  const { assigneeAndTeamList } = payload;
  return produce(state, (draftState: any) => {
    draftState.assigneeAndTeamList = assigneeAndTeamList;
  });
};
