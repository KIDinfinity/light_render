export interface limitProps {
  limitKey: string;
  errorCode: string;
}

export interface AuthProps {
  categoryCode: string;
  result: boolean;
  errorCode: null | string;
  limitResult: limitProps[];
}

export interface TaskDetailProps {
  taskId: string;
  taskDefKey: string;
  businessNo: string;
  caseCategory: string;
  assignee: string;
  inquiryClaimNo: string;
  taskStatus: string;
  activityName: string;
}

export interface TaskAssignProps {
  assigne: string;
  assigner: string;
  authorized: AuthProps[];
}
