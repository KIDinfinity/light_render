import lodash from 'lodash';
import { getFundConfigListByProductCodeList } from '@/services/miscCfgInquiryControllerService';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';

export default function* ({ payload }: any, { call, put, select }: any) {
  const productCodeList = lodash.get(payload, 'productCodeList', []);

  const policyList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.policyList?.[0]
  );
  const response: any = yield call(getFundConfigListByProductCodeList, {
    productCodeList,
    currencyCode: formUtils.queryValue(policyList?.currencyCode),
  });

  if (response?.success && lodash.isArray(response?.resultData)) {
    yield put({
      type: 'setProductCodeList',
      payload: {
        productCodeList: response?.resultData,
      },
    });
    return response?.resultData;
  }
  return [];
}
