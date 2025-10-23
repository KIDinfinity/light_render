import lodash from 'lodash';

interface IAction {
  payload: {
    activityKey: string;
    businessNo: string;
    inquiryBusinessNo: string;
    caseCategory: string;
    taskId: string;
    taskStatus: string;
    assignee: string;
  }
}

export default function (state: any, { payload }: IAction) {
  return {
    ...state,
    ...lodash.pick(payload, [
      'activityKey',
      'businessNo',
      'inquiryBusinessNo',
      'caseCategory',
      'taskId',
      'taskStatus',
      'assignee',
    ]),
  };
}
