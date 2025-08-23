import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import { identityV2 } from '@/services/c360PartyInfoControllerService';
import { tenant } from '@/components/Tenant';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { formUtils } from 'basic/components/Form';
import { HKCustomerType, PolicySource } from 'claim/pages/Enum';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { searchByPolicyId, caseCategory } = payload;
  const searchInsuredObj = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.searchInsuredObj
  );
  const insuredObj: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(searchInsuredObj)
  );
  const { policyId, identityType, identityNo } = insuredObj;
  if (lodash.isEmpty(identityNo) && !lodash.isEmpty(identityType)) {
    insuredObj.identityType = '';
  }

  const commonParams = {
    regionCode: tenant.remoteRegion(),
    businessCode: BusinessCode.claim,
    policySource: PolicySource.individual,
    customerType: HKCustomerType.CUS001,
    caseCategory,
  };
  const params: any = {
    policyIdList: [policyId],
    ...commonParams,
    ...insuredObj,
    policyId,
  };
  const response = yield call(identityV2, params);

  yield put({
    type: 'saveSnapshot',
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && !lodash.isEmpty(resultData)) {
    const partyInfoList = lodash.chain(resultData.partyInfoList).compact().first().value();
    if (lodash.size(resultData.partyInfoList?.[0].policyResultList) > 1 || !searchByPolicyId) {
      yield put({
        type: 'savePartyListInfo',
        payload: {
          insuredList: resultData.partyInfoList,
        },
      });
      yield put({
        type: `updateShowSearchModal`,
        payload: {
          showSearchModel: true,
        },
      });
    } else {
      yield put.resolve({
        type: 'savePartyListInfo',
        payload: {
          policyOwnerList: partyInfoList?.policyResultList,
        },
      });
      yield put.resolve({
        type: 'saveSelectInsuredInfo',
        payload: {
          selectColumns: { ...partyInfoList, policyId: partyInfoList?.policyIdList?.[0] },
          skipPolicyNo: searchByPolicyId,
        },
      });
      yield put({
        type: 'getC360Data',
      });
      yield put({
        type: `updateShowSearchModal`,
        payload: {
          showSearchModel: false,
        },
      });
    }
  } else {
    yield put({
      type: 'cleanSubmitParam',
      payload: {
        policyNo: policyId,
        identityType,
        identityNo,
        searchByPolicyId,
      },
    });
  }
}
