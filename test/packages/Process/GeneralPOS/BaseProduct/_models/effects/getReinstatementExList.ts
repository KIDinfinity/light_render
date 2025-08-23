import { serialize as objectToFormData } from 'object-to-formdata';
import { getCfgExclusion } from '@/services/miscCfgExclusionCodeControllerService';
import { findByRegionCode } from '@/services/pcPlanExtraPremiumLoadingRuleControllerService';
import { findByRegionCodeAndProductCodeList } from '@/services/pcPlanDictProductControllerService';
import { findByRegionAndFuncType } from '@/services/pcPlanLoadingReasonControllerService';

import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

export default function* (_, { call, put, select }: any) {
  const dictObject = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.dictObject
  );
  const policyCoverageList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.policyInfo?.policyCoverageList || []
  );
  const productCodeList = lodash.map(policyCoverageList, (item) => item?.productCode);

  if (lodash.isEmpty(dictObject)) {
    const exclusionCluster = yield call(getCfgExclusion, objectToFormData({})) || [];
    const loadingReasonConfigResponse = yield call(findByRegionCode);
    const loadingReasonResponse = yield call(findByRegionAndFuncType, { loadingFunctionType: 'O' });
    const productCodeListResponse = yield call(findByRegionCodeAndProductCodeList, {
      productCodeList: lodash.isEmpty(productCodeList) ? null : productCodeList,
    });

    const exclusionList = lodash.filter(
      exclusionCluster,
      (item: { type: 'E' | 'D' | 'P' }) => item.type === 'E'
    );

    yield put({
      type: 'saveDictObject',
      payload: {
        loadingReasons: loadingReasonResponse?.resultData,
        exclusionCodes: exclusionList,
        loadingReasonConfig: loadingReasonConfigResponse?.resultData,
        productCodeList: productCodeListResponse?.resultData,
      },
    });
  }
}
