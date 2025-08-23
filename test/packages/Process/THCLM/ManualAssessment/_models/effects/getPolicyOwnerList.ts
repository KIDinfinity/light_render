import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import { identityV2 } from '@/services/c360PartyInfoControllerService';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { Region } from '@/components/Tenant';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { HKCustomerType, PolicySource } from 'claim/pages/Enum';

export default function* (_: any, { call, put, select }: any) {
  const searchInsuredObj = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.searchInsuredObj
  );
  const insured = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData.insured
  );

  const { policyId } = insured;
  const commonParams = {
    regionCode: Region.HK,
    businessCode: BusinessCode.claim,
    policySource: PolicySource.individual,
    customerType: HKCustomerType.CUS001,
  };
  const params = {
    policyIdList: [policyId],
    ...commonParams,
    ...searchInsuredObj,
    policyId,
  };
  const response = yield call(identityV2, params);

  yield put({
    type: 'saveSnapshot',
  });
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const { partyInfoList } = response.resultData;
    const policyResultList = lodash.find(partyInfoList, {
      firstName: insured.firstName,
      surname: insured.surname,
    })?.policyResultList;
    yield put({
      type: 'savePolicyOwnerList',
      payload: {
        policyOwnerList: policyResultList,
      },
    });
    yield put({
      type: 'saveClaimant',
      payload: {
        changedFields: { relationshipWithInsured: relationshipWithInsuredForHK.policyOwner },
      },
    });
  }
}
