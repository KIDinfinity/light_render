import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import bpmProcessTaskService from '@/services/bpmProcessTaskService';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import type { IEffects } from '../interfaces/index';
import { ErrorTypeEnum } from '@/enum/ErrorType';

/**
 * 加载节点名称
 * @param caseNo
 * @param userId
 */
export default function* loadActiveNameList({ payload }: any, { call, put }: IEffects) {
  const userId = lodash.get(payload, 'userId');
  const caseNo = lodash.get(payload, 'caseNo');
  const taskId = lodash.get(payload, 'taskId');

  let bizReponse = lodash.get(payload, 'bizProcess');
  if (!bizReponse && formUtils.queryValue(caseNo)) {
    bizReponse = yield call(findBizProcess, {
      processInstanceId: formUtils.queryValue(caseNo),
    });
  }

  const { success, type } = lodash.pick(bizReponse, ['success', 'type']);
  if (!success && type === ErrorTypeEnum.DataAuthorityException) {
    yield put({
      type: 'authController/saveNoPermissionCases',
      payload: {
        caseNo: formUtils.queryValue(caseNo),
        result: true,
      },
    });
    return true;
  }

  const currentActivityKey = lodash.get(bizReponse, 'resultData.currentActivityKey', '');
  const caseStatus = lodash.get(bizReponse, 'resultData.status', '');

  yield put({
    type: 'setCaseStatus',
    payload: {
      currentActivityKey,
      caseStatus,
    },
  });
  const loadActivityCategoryParams = taskId
    ? {
        userId,
        caseNo,
        taskId,
        useTaskLevelActInfoCategoryCfg: 'Y',
      }
    : {
        userId,
        caseNo,
        useTaskLevelActInfoCategoryCfg: 'N',
      };
  const response = yield call(
    bpmProcessTaskService.loadActivityCategory,
    objectToFormData(loadActivityCategoryParams)
  );

  const resultData = lodash.get(response, 'resultData', {});
  const currentActivity = lodash.isEmpty(resultData)
    ? {}
    : {
        ...resultData,
        activityName: formatMessageApi({
          activity: resultData?.activityCode,
        }),
      };
  yield put({
    type: 'setCurrentActivity',
    payload: {
      currentActivity,
    },
  });
}
