import { findDuplicateDataCombine } from '@/services/ccCombineDataControllerService';

export default function* ({ payload }: any, { select, call, put }: any) {
  const isWarning = payload?.isWarning;
  const { functionId, records, isAdd, caseNo, taskId, dataFieldList } = yield select(
    (state: any) => ({
      ...state.configureUserGroupController,
      isAdd: state.configureUserGroupController?.isAdd,
      functionId: state.configureUserGroupController?.functionData?.id,
      records: state.configureUserGroupController?.listPage?.rows,
      caseNo: state.processTask.getTask?.processInstanceId,
      taskId: state.processTask.getTask?.taskId,
      dataFieldList: state.configureUserGroupController?.functionData?.dataFieldList,
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
