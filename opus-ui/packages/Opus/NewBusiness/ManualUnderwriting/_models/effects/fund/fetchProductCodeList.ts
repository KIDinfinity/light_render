import { getFundConfigListByProductCodeList } from '@/services/miscCfgInquiryControllerService';
import lodash from 'lodash';

export default function* ({ payload }: any, { call, put }: any) {
  const productCodeList = lodash.get(payload, 'productCodeList', []);
  const currencyCode = lodash.get(payload, 'currencyCode');
  if (currencyCode) {
    // @ts-ignore
    const response: any = yield call(getFundConfigListByProductCodeList, {
      productCodeList,
      currencyCode,
    });

    if (response?.success && lodash.isArray(response?.resultData)) {
      yield put({
        type: 'setProductCodeList',
        payload: {
          productCodeList: response?.resultData,
        },
      });
    }
  }
}
