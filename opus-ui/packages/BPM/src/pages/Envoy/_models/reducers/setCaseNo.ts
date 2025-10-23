import lodash from 'lodash';

// TODO:这里需要存caseDetail
export default function (state: any, { payload }: any) {
  const data = lodash.pick(payload?.caseDetail || {}, [
    'caseNo',
    'businessNo',
    'inquiryBusinessNo',
    'taskId',
    'activityKey',
  ]);

  return {
    ...state,
    ...data,
    mainPageCaseNo: data.caseNo,
    mainPageTaskId: data.taskId,
  };
}
