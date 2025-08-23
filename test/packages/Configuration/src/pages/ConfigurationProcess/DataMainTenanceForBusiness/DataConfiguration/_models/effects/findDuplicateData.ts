import { findDuplicateData } from '@/services/ccJpDataControllerService';

export default function* ({ payload }: any, { select, call, put }: any) {
  const isWarning = payload?.isWarning;
  const { functionId, records, isAdd, caseNo, taskId, dataFieldList } = yield select(
    (state: any) => ({
      ...state.dataConfigurationController,
      isAdd: state.dataConfigurationController?.isAdd,
      functionId: state.dataConfigurationController?.functionData?.id,
      records: state.dataConfigurationController?.listPage?.rows,
      caseNo: state.processTask.getTask?.processInstanceId,
      taskId: state.processTask.getTask?.taskId,
      dataFieldList: state.dataConfigurationController?.functionData?.dataFieldList,
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
        isWarning,
      },
    });
  }
}
