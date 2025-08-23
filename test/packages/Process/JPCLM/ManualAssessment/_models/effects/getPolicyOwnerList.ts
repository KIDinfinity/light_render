import lodash from 'lodash';
import { identityV2 } from '@/services/c360PartyInfoControllerService';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { formUtils } from 'basic/components/Form';
import { Region } from '@/components/Tenant';
import { relationshipWithInsuredForJP } from 'claim/enum';
import { HKCustomerType, PolicySource } from 'claim/pages/Enum';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { searchInsuredObj, insured } = yield select((state) => ({
    searchInsuredObj: state.JPCLMOfClaimAssessment.searchInsuredObj,
    insured: state.JPCLMOfClaimAssessment.claimProcessData.insured,
  }));
  const { policyId } = insured;
  const commonParams = {
    regionCode: Region.JP,
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
  const response = yield call(identityV2, formUtils.cleanValidateData(params));

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
        changedFields: { relationshipWithInsured: relationshipWithInsuredForJP.PolicyOwner },
      },
    });
  }
}
