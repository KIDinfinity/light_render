import { produce } from 'immer';

interface IAction {
  payload: {
    taskDetail: any;
  };
}

export default function saveTaskDetail(state: any, { payload }: IAction) {
  const { taskDetail } = payload;
  const caseNo = taskDetail.caseNo || taskDetail.processInstanceId;
  const assignee = taskDetail.assignee;
  return produce(state, (draftState: any) => {
    if (draftState.caseNo !== caseNo || draftState.assignee !== assignee) {
      draftState.taskDetail = {
        ...taskDetail,
        caseNo,
        isAssinee: draftState.readUserId === taskDetail.assignee,
      };
      draftState.isAssinee = draftState.readUserId === taskDetail.assignee;
    }
  });
}
