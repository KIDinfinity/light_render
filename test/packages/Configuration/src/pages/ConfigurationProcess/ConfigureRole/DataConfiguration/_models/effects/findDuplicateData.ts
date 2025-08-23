import { findDuplicateDataCombine } from '@/services/ccCombineDataControllerService';

export default function* ({ payload }: any, { select, call, put }: any) {
  const isWarning = payload?.isWarning;
  const { functionId, records, isAdd, caseNo, taskId, dataFieldList } = yield select(
    (state: any) => ({
      ...state.configureRoleController,
      isAdd: state.configureRoleController?.isAdd,
      functionId: state.configureRoleController?.functionData?.id,
      records: state.configureRoleController?.listPage?.rows,
      caseNo: state.processTask.getTask?.processInstanceId,
      taskId: state.processTask.getTask?.taskId,
      dataFieldList: state.configureRoleController?.functionData?.dataFieldList,
    })
  );

  if (!isAdd) {
    return;
  }

  const response = yield call(findDuplicateDataCombine, {
    functionId,
    records,
    caseNo,
    taskId,
  });

  if (response && response?.success && response.resultData?.length) {
    yield put({
      type: 'saveDuplicateListPage',
      payload: {
        duplicateList: response.resultData,
        dataFieldList,
        isWarning,
      },
    });
  }
}
