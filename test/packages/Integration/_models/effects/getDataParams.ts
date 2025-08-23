import lodash from 'lodash';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import { getTask } from '@/services/navigatorCaseManagementControllerService';
import type CaseCategory from 'enum/CaseCategory';
import type TaskDefKey from 'enum/TaskDefKey';
import type TaskStatus from 'enum/TaskStatus';
const getDefaultActivityCode = (caseCategory: string) => {
  switch (caseCategory) {
    case 'BP_AP_CTG02':
      return 'BP_AP_ACT003';
    case 'BP_NB_CTG001':
    case 'BP_NB_CTG005':
      return 'BP_NB_ACT004';
    default:
      return 'BP_NB_ACT004';
  }
};
interface IProcessInfo {
  caseCategory?: typeof CaseCategory;
  taskDefKey?: typeof TaskDefKey;
  activityCode?: typeof TaskDefKey;
  activityKey?: typeof TaskDefKey;
  businessNo?: string;
  caseNo?: string;
  taskId?: string;
  taskStatus: TaskStatus;
}
export default function* (action: any, { call, put }: any) {
  const { taskId, caseNo, processInstanceId } = lodash.pick(action?.payload, [
    'caseNo',
    'taskId',
    'processInstanceId',
  ]);
  const processInfo: IProcessInfo = yield (function* () {
    if (taskId) {
      const response = yield call(
        getTask,

        objectToFormData({
          taskId,
        })
      );

      // getTask(
      //   objectToFormData({
      //     taskId,
      //   }),
      //   {
      //     signal: abortController.signal,
      //   }
      // );
      if (response?.success) {
        const data = lodash.pick(response?.resultData, [
          'caseCategory',
          'taskDefKey',
          'businessNo',
          'inquiryBusinessNo',
          'taskId',
          'processInstanceId',
          'taskStatus',
        ]);
        return {
          ...data,
          activityCode: data?.taskDefKey,
          activityKey: data?.taskDefKey,
          caseNo: data?.processInstanceId,
        };
      }
    }
    if (caseNo || processInstanceId) {
      const response = yield call(findBizProcess, {
        processInstanceId: caseNo || processInstanceId,
      });
      // const response = await findBizProcess(
      //   { processInstanceId: caseNo || processInstanceId },
      //   {
      //     signal: abortController.signal,
      //   }
      // );

      if (response?.success) {
        const data = lodash.pick(response?.resultData, [
          'currentActivityKey',
          'caseCategory',
          'businessNo',
          'caseNo',
          'currentTaskId',
          'status',
        ]);

        const defaultActivityKey = getDefaultActivityCode(data?.caseCategory);

        const currentActivityKey = data?.currentActivityKey || defaultActivityKey;
        return {
          // caseCategory: 'BP_AP_CTG02',
          caseCategory: data?.caseCategory,
          taskDefKey: currentActivityKey,
          activityCode: currentActivityKey,
          activityKey: currentActivityKey,
          businessNo: data?.businessNo,
          caseNo: data?.caseNo,
          // 这里有坑 currentTaskId 不是一定有的
          taskId: data?.currentTaskId,
          taskStatus: data?.status,
        };
      }
    }
  })();
  yield put({
    type: 'getIntegrationChecklist',
    payload: {
      ...lodash.pick(processInfo, ['businessNo', 'caseNo', 'caseCategory']),
    },
  });
}
