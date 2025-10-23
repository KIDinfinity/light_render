import { serialize as objectToFormData } from 'object-to-formdata';
import navigatorEnvoyControllerService from '@/services/navigatorEnvoyControllerService';
import { get, isArray, some, compact, concat } from 'lodash';

enum EPendInfoStatus {
  Active = 'Active',
  Resolved = 'Resolved',
}

enum EPendCategoryCode {
  Client = 'JP_PND_006',
  Branch = 'JP_PND_008',
  Investegate = 'JP_PND_007',
}

export default function* truthPendingConfirm(_: any, { call, put, select }: any) {
  // 获取pending那边已经请求回来的currentReasonGroups以及historyReasonGroups数据
  const taskId = yield select((state: any) => state.envoyController.taskId);
  let currentReasonGroups = yield select((state: any) => state.envoyController.currentReasonGroups);
  let historyReasonGroups = yield select((state: any) => state.envoyController.historyReasonGroups);
  const pendInfoStatus = [EPendInfoStatus.Active, EPendInfoStatus.Resolved];
  const pendCategoryCode = [
    EPendCategoryCode.Client,
    EPendCategoryCode.Branch,
    EPendCategoryCode.Investegate,
  ];
  let pendingConfirm = false;
  // 获取pending那边数据不存在就请求后端数据
  if (!taskId) {
    const taskDetail = yield select((state: any) => state.processTask.getTask);
    const { taskId: taskDetailId, processInstanceId } = taskDetail || {};
    if (!processInstanceId) {
      return;
    }
    const response = yield call(
      navigatorEnvoyControllerService.findReasonInfo,
      objectToFormData({
        caseNo: processInstanceId,
        taskId: taskDetailId,
      })
    );
    if (get(response, 'success') && get(response, 'resultData')) {
      const { resultData } = response;
      currentReasonGroups = get(resultData, 'currentReasonGroups');
      historyReasonGroups = get(resultData, 'historyReasonGroups');
    }
  }

  if (isArray(currentReasonGroups) || isArray(historyReasonGroups)) {
    const pendingInfoList = concat(currentReasonGroups, historyReasonGroups);
    pendingConfirm = some(
      compact(pendingInfoList),
      (item: any) =>
        pendInfoStatus.includes(item.status) && pendCategoryCode.includes(item.pendCategoryCode)
    );
  }

  yield put({
    type: 'saveTruthPendingConfirm',
    payload: {
      pendingConfirm,
    },
  });
}
