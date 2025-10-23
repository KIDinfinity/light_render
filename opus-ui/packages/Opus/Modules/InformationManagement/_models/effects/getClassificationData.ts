import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { getClassification } from '@/services/navigatorInfoManagementControllerService';
import type { IEffects } from '../interfaces/index';

/**
 * 获取linkTo 信息
 * @param {String} processInstanceId
 */
export default function* getClassificationData({ payload }: any, { call, put, select }: IEffects) {
  const processInstanceId = lodash.get(payload, 'processInstanceId', '');
  if (!processInstanceId) {
    return;
  }
  const response = yield call(
    getClassification,
    objectToFormData({
      caseNo: processInstanceId,
    })
  );
  const classification = lodash.get(response, 'resultData', {}) || {};
  yield put({
    type: 'setClassification',
    payload: {
      classification,
    },
  });
  return classification;
}
