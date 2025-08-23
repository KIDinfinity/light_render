import lodash from 'lodash';
import bpmProcessTaskService from '@/services/bpmProcessTaskService';
import { serialize as objectToFormData } from 'object-to-formdata';
import type { IEffects } from '../interfaces/index';

/**
 * 加载当前节点默认选中category
 * @param {String} dataKey taskId/caseNo
 * @param {String} dataValue
 */
export default function* loadDefaultActiveCategory({ payload }: any, { call, put }: IEffects) {
  const dataValue = lodash.get(payload, 'dataValue', '');
  const dataKey = lodash.get(payload, 'dataKey', '');
  const response = yield call(
    bpmProcessTaskService.getDefaultActivityCode,
    objectToFormData({
      dataKey,
      dataValue,
    })
  );
  const activityCode = lodash.get(response, 'resultData', '');
  yield put({
    type: 'setDefaultCategoryByActivivityCode',
    payload: {
      activityCode,
    },
  });
  yield put({
    type: 'saveDefaultCategoryByActivivityCode',
    payload: {
      activityCode,
    },
  });
  yield put({
    type: 'mergeInformation',
    payload: {
      changedFields: {
        activityCode,
      },
    },
  });
  return activityCode;
}
