import { findAllLatestFundPriceByEffectiveDate } from '@/services/posSrvCaseInquiryControllerService';

import lodash from 'lodash';

export default function* ({ payload }, { call, put }: any) {
  const { effectiveDate, businessNo } = payload;
  const result = yield call(findAllLatestFundPriceByEffectiveDate, { effectiveDate, businessNo });

  if (lodash.isPlainObject(result) && result.success) {
    yield put({
      type: 'savePriceByfundCode',
      payload: {
        priceByfundCode: lodash.groupBy(result.resultData, 'fundCode'),
      },
    });
  }
}
