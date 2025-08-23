import lodash from 'lodash';
import type { IEffects } from '../interfaces/index';

/**
 * change fields 所用的方法
 * @param {Object} changedFields  修改的filelds 的值
 */
export default function* changeInformationFields({ payload }: any, { select, put }: IEffects) {
  const changedFields = lodash.get(payload, 'changedFields', {});
  const informationData = yield select(
    (state) => state.navigatorInformationController?.informationData
  );
  const result = {
    ...informationData,
    ...changedFields,
  };
  yield put({
    type: 'setInformationData',
    payload: {
      informationData: result,
    },
  });
  yield put({
    type: 'getCurrentActivityCategory',
  });
  const values = lodash.map(Object.values(changedFields), (item) => item?.dirty);
  if (!values.includes(false)) {
    yield put({
      type: 'changeFieldsEffects',
      payload: {
        changedFields,
      },
    });
  }
  if (changedFields?.activityCode) {
    yield put({
      type: 'clearAuditLogPagination',
    });
    yield put({
      type: 'getTriggerPointData',
    });
  }
}
