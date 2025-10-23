export default function* (_: any, { put, select }: any) {
  const taskDetail = yield select((state: any) => state.manualUnderwriting.taskDetail);
  let dataForSubmit = yield put.resolve({
    type: 'getDataForSubmit',
  });
  dataForSubmit = {
    ...dataForSubmit,
    operationType: 'updateClient',
    activityKey: taskDetail?.activityKey,
    businessNo: taskDetail?.businessNo,
    caseCategory: taskDetail?.caseCategory,
    taskId: taskDetail?.taskId,
    caseNo: taskDetail?.processInstanceId,
  };
  return dataForSubmit;
}
