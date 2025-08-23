import lodash from 'lodash';
import { getFundConfigListByProductCodeList } from '@/services/miscCfgInquiryControllerService';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';

export default function* ({ payload }: any, { call, put, select }: any) {
  const coreCode = lodash.get(payload, 'coreCode');
  const id = lodash.get(payload, 'id');
  if (!id) {
    return null;
  }
  const coverageList = yield select(
    (state: any) => state?.manualUnderwriting?.businessData?.policyList?.[0]?.coverageList
  );
  const isMain = lodash.find(coverageList, { id })?.isMain;

  const productCodeListByCoreCode = lodash
    .chain(coverageList).filter(item => item.id !== id).map((item: any) => formUtils.queryValue(item.coreCode)).concat([coreCode]).compact().value();

  const policyList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.policyList?.[0]
  );
  const response: any = yield call(getFundConfigListByProductCodeList, {
    productCodeList: productCodeListByCoreCode,
    currencyCode: formUtils.queryValue(policyList?.currencyCode),
  });

  if (response?.success && lodash.isArray(response?.resultData)) {
    if (isMain !== 'Y') {
      yield put({
        type: 'autoAttachFunds',
        payload: {
          productCodeList: response?.resultData,
          coreCode,
          productCodeListByCoreCode
        },
      })
    };

    yield put({
      type: 'setProductCodeList',
      payload: {
        productCodeList: response?.resultData,
      },
    });
  }
  return null;
}
