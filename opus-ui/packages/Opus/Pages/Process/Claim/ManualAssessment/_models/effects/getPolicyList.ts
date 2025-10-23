import lodash from 'lodash';
import { identityV2 } from '@/services/c360PartyInfoControllerService';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { HKCustomerType, PolicySource } from 'claim/pages/Enum';

export default function* ({ payload }: any, { call, put }: any) {
  const { clientId } = payload;
  const commonParams = {
    regionCode: tenant.remoteRegion(),
    businessCode: BusinessCode.claim,
    policySource: PolicySource.individual,
    customerType: HKCustomerType.CUS001,
  };
  const params: any = {
    ...commonParams,
    clientId,
  };
  const response = yield call(identityV2, formUtils.cleanValidateData(params));
  if (response?.success) {
    const partyInfoList = response?.resultData?.partyInfoList;
    const policyList = lodash
      .chain(partyInfoList)
      .map((item) => item?.policyIdList)
      .flatten()
      .uniq()
      .compact()
      .value();

    yield put({
      type: 'policyListUpdate',
      payload: { policyList },
    });
  }
}
