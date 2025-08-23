import navigatorLabelService from '@/services/navigatorLabelService';

export default function* getIndicator(_: any, { call, select, put }: any) {
  const { caseNo, taskId, inquiryBusinessNo } = yield select(
    ({ processTask }: any) => processTask?.getTask
  ) || {};

  const response = yield call(navigatorLabelService.addCaseLabel, {
    caseNo,
    inquiryBusinessNo,
    labelCode: 'Investigation',
    labelValue: 'Investigation',
  });

  if (!!response?.success) {
    yield put({
      type: 'processTask/getTask',
      payload: {
        taskId,
      },
    });
    return true;
  }
  return false;
}
