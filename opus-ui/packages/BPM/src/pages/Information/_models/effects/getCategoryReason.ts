import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import { getCategroyReason as getReason } from '@/services/navigatorInformationControllerV2Service';
import type { IEffects } from '../interfaces/index';

export default function* getCategoryReason({ payload }: any, { call, select, put }: IEffects) {
  const { caseCategory, businessNo, categoryCode } = payload;
  const informationData = yield select(
    (state) => state?.navigatorInformationController?.informationData
  );
  const appealCaseNoCover = yield select(
    (state) => state?.navigatorInformationController?.appealCaseNoCover
  );
  const activityCode = formUtils.queryValue(informationData?.activityCode);
  let bizNo = businessNo;
  let caseCategoryValue = caseCategory;
  if (!categoryCode || !activityCode) {
    return false;
  }
  if (
    !caseCategoryValue ||
    !bizNo ||
    window.location.href.indexOf('/case/detail') > 0 ||
    window.location.href.indexOf('/nb/history') > 0
  ) {
    const caseNo = formUtils.queryValue(informationData.caseNo);
    if(caseNo) {
      const bizReponse = yield call(findBizProcess, {
        processInstanceId: caseNo,
      });
      caseCategoryValue = lodash.get(bizReponse, 'resultData.caseCategory', '');
      bizNo = lodash.get(bizReponse, 'resultData.businessNo', '');
    }
  }

  const response = yield call(getReason, {
    categoryCode,
    businessNo: bizNo,
    activityCode,
    caseCategory: appealCaseNoCover ? 'BP_NB_CTG001' : caseCategoryValue,
  });
  if (response.success) {
    yield put({
      type: 'setCategoryReson',
      payload: {
        categoryReason: response.resultData,
      },
    });
  }
  return response;
}
