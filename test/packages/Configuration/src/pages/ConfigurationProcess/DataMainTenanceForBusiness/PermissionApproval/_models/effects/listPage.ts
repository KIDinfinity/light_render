import { handlerSearchParams } from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { taskData } from '@/services/ccJpDataControllerService';

export default [
  function* ({ payload = {} }: any, { put, call, select }: any) {
    const { functionData, caseNo, isAdd } = yield select((state: any) => ({
      functionData: state.permissionConfigurationController?.functionData,
      caseNo: state.processTask.getTask?.processInstanceId,
      isAdd: state.permissionConfigurationController?.isAdd,
    }));
    const pageSize = isAdd ? { pageSize: 99999 } : {};
    const { id: functionId, functionCode } = functionData;

    const newParams = handlerSearchParams(
      {
        ...payload,
        functionId,
        functionCode,
      },
      functionData
    );

    const response = yield call(taskData, {
      ...newParams,
      page: {
        ...newParams?.page,
        ...pageSize,
      },
      caseNo,
    });
    if (response?.success) {
      yield put({
        type: 'saveListPage',
        payload: {
          listPage: {
            ...response?.resultData,
            pageSize: newParams?.page?.pageSize || response?.resultData?.pageSize,
          },
        },
      });
    }
  },
  { type: 'takeLatest' },
];
