import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import { getTriggerPoint } from '@/services/bpmAuditLogTriggerPointService';
import type { IEffects } from '../interfaces/index';
/**
 *  获取配置接口数据
 */

export default function* getTriggerPointData(action: any, { put, call, select }: IEffects) {
  const { informationData, auditLogPagination, auditLogMounted } = yield select(
    (state: any) => state.navigatorInformationController
  );
  if (action?.payload?.init) {
    if (auditLogMounted) return;

    yield put({
      type: 'mountAuditLog',
    });
  } else {
    if (!auditLogMounted) {
      return;
    }
  }
  let activityCode = formUtils.queryValue(informationData?.activityCode);
  const processInstanceId = formUtils.queryValue(informationData?.caseNo);
  let caseCategory =
    action?.payload?.caseCategory || formUtils.queryValue(informationData?.caseCategory) || '';
  if (lodash.isEmpty(activityCode)) {
    activityCode = yield put.resolve({
      type: 'loadDefaultActiveCategory',
      payload: {
        dataKey: 'caseNo',
        dataValue: processInstanceId,
      },
    });
  }
  if (!caseCategory && processInstanceId) {
    const bizReponse = yield call(findBizProcess, {
      processInstanceId,
    });
    caseCategory = lodash.get(bizReponse, 'resultData.caseCategory', '');
  }
  yield put({
    type: 'changeInformationFields',
    payload: {
      changedFields: {
        caseCategory,
      },
    },
  });

  const response = yield call(getTriggerPoint, {
    activityCode,
    caseCategory,
    processInstanceId,
  });

  if (lodash.isPlainObject(response) && response?.success && response?.resultData) {
    const triggerPointCode = lodash.map(
      response?.resultData,
      (triggerItem: any) => triggerItem?.triggerPointCode
    );

    yield put({
      type: 'setTriggerPointCode',
      payload: {
        triggerPointCode,
      },
    });
    yield put({
      type: 'getAuditLogsList',
      payload: {
        params: {
          ...auditLogPagination,
          params: {
            processInstanceId,
          },
        },
      },
    });
  }
}
