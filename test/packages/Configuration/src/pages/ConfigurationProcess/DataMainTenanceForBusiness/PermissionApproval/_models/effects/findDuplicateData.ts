import { findDuplicateData } from '@/services/ccJpDataControllerService';

export default function* (_: any, { select, call, put }: any) {
  const { functionId, records, isAdd, caseNo, taskId, dataFieldList } = yield select(
    (state: any) => ({
      isAdd: state.permissionConfigurationController?.isAdd,
      functionId: state.permissionConfigurationController?.functionData?.id,
      records: state.permissionConfigurationController?.listPage?.rows,
      caseNo: state.processTask.getTask?.processInstanceId,
      taskId: state.processTask.getTask?.taskId,
      dataFieldList: state.permissionConfigurationController?.functionData?.dataFieldList,
    })
  );

  if (!isAdd) {
    return;
  }

  const response = yield call(findDuplicateData, {
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
      },
    });
  }
}
