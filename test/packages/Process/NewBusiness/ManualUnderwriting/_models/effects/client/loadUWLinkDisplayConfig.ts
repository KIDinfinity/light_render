import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { judgeCheckRule } from '@/services/owbNbCfgControllerService';

import { NAMESPACE } from '../../../activity.config';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { channel, params }: any = lodash.pick(payload, ['channel']);
  const uwType = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.planInfoData?.gsIndicator
  );
  const companyCode = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.laCompanyCode
  );
  const coverageList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.coverageList
  );
  const taskDetail = yield select((state: any) => state.processTask.getTask);
  const businessNo =
    params?.businessNo ||
    formUtils.queryValue(taskDetail?.businessNo || taskDetail?.inquiryBusinessNo);
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
