import type { IEffects } from '../interfaces/index';
import { formUtils } from 'basic/components/Form';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import lodash from 'lodash'
/**
 * 加载首页历史数据 用于初始化/筛选条件变动时调用
 * @param tabs
 */
export default function* loadFirstPage(_: any, { put, select, call }: IEffects) {
  // const infoViewAuth = yield put.resolve({
  //   type: 'authController/CheckInformation',
  // });

  // if (!infoViewAuth) return;

  const { informationData } = yield select(
    (state: any) => state.navigatorInformationController
  );
  const processInstanceId = formUtils.queryValue(informationData?.caseNo);
  let caseCategory = formUtils.queryValue(informationData?.caseCategory);
  if(!caseCategory && processInstanceId) {
    const bizReponse = yield call(findBizProcess, {
      processInstanceId,
    });
    caseCategory = lodash.get(bizReponse, 'resultData.caseCategory', '');
  }

  yield put.resolve({
    type: 'loadAllCategoryInformation',
    payload: {caseCategory}
  });
  yield put({
    type: 'clearAuditLogPagination',
  });
  yield put({
    type: 'getTriggerPointData',
    payload: {caseCategory}
  });
}
