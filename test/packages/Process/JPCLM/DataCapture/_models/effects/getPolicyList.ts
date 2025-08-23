import lodash from 'lodash';
import { inquiryByInsured } from '@/services/claimC360PolicyControllerService';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

export default function* (_: any, { select, call, put }: any) {
  // @ts-ignore
  const insuredInfo = yield select(
    (state: any) => state.JPCLMOfDataCapture.claimProcessData.insured
  ) || {};

  if (!lodash.isEmpty(insuredInfo)) {
    const insuredObj: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(insuredInfo));
    const { policyId, insuredId } = lodash.pick(insuredObj, ['policyId', 'insuredId']);
    const params = {
      insured: { insuredId, policyId },
      regionCode: tenant.remoteRegion(),
    };
    // @ts-ignore
    const response = yield call(inquiryByInsured, params);
    if (
      lodash.isPlainObject(response) &&
      response?.success &&
      lodash.isPlainObject(response?.resultData) &&
      lodash.isArray(response?.resultData?.policyContractList)
    ) {
      yield put({
        type: 'policyListUpdate',
        payload: { policyContractList: response?.resultData?.policyContractList || [] },
      });
    }
  }
}
