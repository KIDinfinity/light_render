import lodash from 'lodash';

import NAMESPACE from '../namespace';
import { formUtils } from 'basic/components/Form';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import { getTriggerPoint } from '@/services/bpmAuditLogTriggerPointService';
import type { IEffects } from '../interfaces/index';
/**
 *  获取配置接口数据
 */

export default function* getTriggerPointData(action: any, { put, call, select }: IEffects) {
  const { payload } = action;
  const { informationData } = yield select((state: any) => state.navigatorInformationController);
  const auditLogPagination = yield select((state: any) => state?.[NAMESPACE]?.auditLogPagination);

  let activityCode;
  const processInstanceId = payload.processInstanceId;
  let caseCategory =
    action?.payload?.caseCategory || formUtils.queryValue(informationData?.caseCategory) || '';
  let inquiryBusinessNo =
    action?.payload?.inquiryBusinessNo ||
    formUtils.queryValue(informationData?.inquiryBusinessNo) ||
    '';
  if ((!caseCategory || inquiryBusinessNo) && processInstanceId) {
    const bizReponse = yield call(findBizProcess, {
      processInstanceId,
    });
    caseCategory = lodash.get(bizReponse, 'resultData.caseCategory', '');
    activityCode = lodash.get(bizReponse, 'resultData.currentActivityKey', '');
    inquiryBusinessNo = lodash.get(bizReponse, 'resultData.inquiryBusinessNo', '');
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
            platformCode: 'opus',
            inquiryBusinessNo,
          },
        },
      },
    });
  }
}
