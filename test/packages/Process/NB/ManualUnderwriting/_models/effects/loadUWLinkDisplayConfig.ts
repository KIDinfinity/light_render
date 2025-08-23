import lodash from 'lodash';
import { judgeCheckRule } from '@/services/owbNbCfgControllerService';

export default function* ({ payload }: any, { call, put, select }) {
  const { channel, businessNo }: any = lodash.pick(payload, ['channel', 'businessNo']);
  const uwType = yield select(
    (state: any) => state.manualUnderwriting.businessData?.policyList?.[0]?.gsIndicator
  );
  const companyCode = yield select(
    (state: any) => state.manualUnderwriting.businessData?.laCompanyCode
  );
  const businessData = yield select((state: any) => state.manualUnderwriting.businessData);
  const coverageList = lodash.get(businessData, 'policyList[0].coverageList', []);
  const productCode = lodash
    .chain(coverageList)
    .find((item: any) => item.isMain === 'Y')
    .get('productCode')
    .value();
  const productType = lodash
    .chain(coverageList)
    .find((item: any) => item.isMain === 'Y')
    .get('productType')
    .value();
  const response = yield call(judgeCheckRule, {
    companyCode,
    channel,
    uwType,
    businessNo,
    productCode,
    productType,
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    yield put({
      type: 'saveDisplayUWMELinkConfig',
      payload: {
        displayUWMELink: resultData,
      },
    });
  }
}
