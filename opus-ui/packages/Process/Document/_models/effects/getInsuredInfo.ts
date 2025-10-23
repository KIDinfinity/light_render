import lodash from 'lodash';
import { identityV2 } from '@/services/c360PartyInfoControllerService';
import { tenant } from '@/components/Tenant';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { HKCustomerType, PolicySource } from 'claim/pages/Enum';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { policyIdList } = payload;

  const response = yield call(identityV2, {
    regionCode: tenant.remoteRegion(),
    businessCode: BusinessCode.claim,
    policySource: PolicySource.individual,
    customerType: HKCustomerType.CUS001,

    policyIdList,
  });

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    if (lodash.size(response.resultData?.partyInfoList) > 1) {
      yield put({
        type: 'saveSearchList',
        payload: {
          searchList: response.resultData?.partyInfoList,
        },
      });
    } else {
      const partyInfoItem =
        lodash
          .chain(response.resultData?.partyInfoList || [])
          .compact()
          .first()
          .value() || {};
      const { firstName, surname } = partyInfoItem;
      yield put({
        type: 'updateInsuredName',
        payload: {
          insuredName: `${firstName} ${surname}`,
        },
      });
    }
  }
}
